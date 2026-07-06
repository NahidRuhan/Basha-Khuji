import { ICreateProperty, IUpdateProperty } from "./landlord.interface";
import { prisma } from "../../lib/prisma";
import { RentalRequestStatus } from "../../../generated/prisma/enums";

const createProperty = async (userId: string, payLoad: ICreateProperty) => {
  const { categoryName, locationName, ...restPayload } = payLoad;

  const category = await prisma.categories.findUnique({
    where: { categoryName },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  const location = await prisma.location.findUnique({
    where: { locationName },
  });
  if (!location) {
    throw new Error("Location not found");
  }

  const existingProperty = await prisma.properties.findFirst({
    where: {
      userId,
      categoryId: category.categoryId,
      locationId: location.locationId,
      ...restPayload,
      amenities: { equals: restPayload.amenities },
      images: { equals: restPayload.images },
    },
  });

  if (existingProperty) {
    throw new Error("Property already exists");
  }

  const createdProperty = await prisma.properties.create({
    data: {
      userId,
      categoryId: category.categoryId,
      locationId: location.locationId,
      ...restPayload,
    },
  });

  return createdProperty;
};

const updateProperty = async (userId:string,propertyId:string,payLoad:IUpdateProperty)=>{

  const property = await prisma.properties.findUnique({
    where:{
      propertyId
    }
  })

  if(!property){
    throw new Error("Property not found")
  }

  if(property.userId !== userId){
    throw new Error("You are not authorized to update this property")
  }

  const { categoryName, locationName, ...restPayload } = payLoad;
  let categoryId: string | undefined = undefined;
  let locationId: string | undefined = undefined;

  if (categoryName) {
    const category = await prisma.categories.findUnique({ where: { categoryName } });
    if (!category) throw new Error("Category not found");
    categoryId = category.categoryId;
  }

  if (locationName) {
    const location = await prisma.location.findUnique({ where: { locationName } });
    if (!location) throw new Error("Location not found");
    locationId = location.locationId;
  }

  const updatedProperty = await prisma.properties.update({
    where:{
      propertyId
    },
    data: {
      ...restPayload,
      ...(categoryId && { categoryId }),
      ...(locationId && { locationId })
    }
  })

  return updatedProperty
}

const deleteProperty = async (userId:string,propertyId:string)=>{

  const property = await prisma.properties.findUnique({
    where:{
      propertyId
    }
  })

  if(!property){
    throw new Error("Property not found")
  }

  if(property.userId !== userId){
    throw new Error("You are not authorized to delete this property")
  }

  const deletedProperty = await prisma.properties.delete({
    where:{
      propertyId
    }
  })

  return deletedProperty
}

const getAllRequest = async(userId:string)=>{
  const requests = await prisma.rentalRequests.findMany({
    where: {
      property: {
        userId: userId 
      }
    },
    include: {
      property: true,
      user: {
        select: {
          userId: true,
          userName: true,
          email: true,
          profileImage: true,
          phoneNumber: true
        }
      } 
    }
  });

  return requests;
}

const updateRequest = async (requestId:string, userId:string,payLoad:{status:RentalRequestStatus})=>{

  const request = await prisma.rentalRequests.findUnique({
    where:{
      requestId
    },
    include: {
      property: true
    }
  })

  if(!request){
    throw new Error("Request not found")
  }

  if(request.property.userId !== userId){
    throw new Error("You are not authorized to update this request")
  }

  const updatedRequest = await prisma.rentalRequests.update({
    where:{
      requestId
    },
    data:{
      ...payLoad
    }
  })

  return updatedRequest
}

export const landlordService = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllRequest,
  updateRequest
};
