import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateRequest } from "./request.interface";

const createRequest = async (userId:string,payLoad: ICreateRequest) => {

    const { propertyId, message } = payLoad;

    const property = await prisma.properties.findUnique({
        where: { propertyId }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    const existingRequest = await prisma.rentalRequests.findFirst({
        where: {
            propertyId,
            userId,
            status: RentalRequestStatus.PENDING
        }
    });

    if (existingRequest) {
        throw new Error("You already have a pending request for this property");
    }

    const createdRequest = await prisma.rentalRequests.create({
        data: {
            propertyId,
            userId,
            message
        }
    });

    return createdRequest;
}

export const requestService = {
    createRequest
}