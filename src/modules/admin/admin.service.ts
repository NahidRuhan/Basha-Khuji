import { prisma } from "../../lib/prisma"
import { IChangeUserStatus } from "./admin.interface";

const getAllUser = async () => {
    const users = await prisma.users.findMany({
        omit:{password:true}
    })
    return users
}

const changeUserStatus = async (userId:string,payload:IChangeUserStatus) => {
    const isUserExist = await prisma.users.findUnique({
        where: { userId }
    });

    if (!isUserExist) {
        throw new Error("User not found");
    }

    const user = await prisma.users.update({
        where:{
            userId
        },
        data:payload,
        omit: { password: true }
    })
    return user
}

const getAllProperty = async () => {
    const properties = await prisma.properties.findMany();
    return properties;
}

const getAllRental = async () => {
    const rentals = await prisma.rentalRequests.findMany();
    return rentals;
}

export const adminService = {
    getAllUser,
    changeUserStatus,
    getAllProperty,
    getAllRental
}
