import  httpStatus  from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body

    const {accessToken,refreshToken} = await authService.loginUser(payLoad)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    }); 

})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{

  const refreshToken = req.cookies.refreshToken
  const {accessToken} = await authService.refreshToken(refreshToken)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token refreshed successfully",
    data: { accessToken },
  });

})

const getCurrentUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user

    sendResponse(res,{
      success: true,
      statusCode: httpStatus.OK,
      message: "User fetched successfully",
      data: user
    })
}) 

const logoutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged out successfully",
    data: null,
  });
});

export const authController = {
    loginUser,
    refreshToken,
    getCurrentUser,
    logoutUser
}