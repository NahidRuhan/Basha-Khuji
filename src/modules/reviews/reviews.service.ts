import { prisma } from '../../lib/prisma';
import { RentalRequestStatus } from '../../../generated/prisma/enums';
import { ICreateReview } from './reviews.interface';

const createReview = async (userId: string, payload: ICreateReview) => {
    const { requestId, review, rating } = payload;

    const request = await prisma.rentalRequests.findUnique({
        where: { requestId, userId }
    });

    if (!request) {
        throw new Error("Rental request not found");
    }

    if (request.status !== RentalRequestStatus.COMPLETED && request.status !== RentalRequestStatus.ACTIVE) {
        throw new Error("You can only review an ACTIVE or COMPLETED rental");
    }

    const existingReview = await prisma.reviews.findUnique({
        where: { requestId }
    });

    if (existingReview) {
        throw new Error("You have already reviewed this property for this rental request");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    const createdReview = await prisma.reviews.create({
        data: {
            requestId,
            review,
            rating
        }
    });

    return createdReview;
};

export const reviewsService = {
    createReview
};
