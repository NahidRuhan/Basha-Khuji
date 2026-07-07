import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewsService } from "./reviews.service";

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.userId as string;

    const result = await reviewsService.createReview(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review created successfully",
        data: result,
    });
});

export const reviewsController = {
    createReview
};
