import { ICreateProperty } from "./landlord.interface"
import { prisma } from "../../lib/prisma"


const createProperty = async (userId:string,payLoad:ICreateProperty)=>{

    const existingProperty = await prisma.properties.findFirst({
        where: {
            userId,
            ...payLoad,
            amenities: { equals: payLoad.amenities },
            images: { equals: payLoad.images }
        }
    })
    
    if (existingProperty) {
        throw new Error("Property already exists");
    }

    const createdProperty = await prisma.properties.create({
        data: {
            userId,
            ...payLoad
        }
    })

    return createdProperty
}

export const landlordService = {
    createProperty
}
