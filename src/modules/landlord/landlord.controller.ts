import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { landlordService } from "./landlord.service";

const createProperty = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{

    const payLoad = req.body
    const userId = req.user?.userId as string

    const result = await landlordService.createProperty(userId,payLoad)

    sendResponse(res,{
      success: true,
      statusCode: 201,
      message: "Property created successfully",
      data: result,
    })

})

export const landlordController = {
    createProperty
}