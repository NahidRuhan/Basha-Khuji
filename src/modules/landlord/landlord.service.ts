import { ICreateProperty, IUpdateProperty } from "./landlord.interface";
import { prisma } from "../../lib/prisma";

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

export const landlordService = {
  createProperty,
  updateProperty,
  deleteProperty
};
