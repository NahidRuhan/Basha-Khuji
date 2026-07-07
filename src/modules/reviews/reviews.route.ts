import express from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";

const router = express.Router();

router.post("/", auth(UserRole.TENANT), reviewsController.createReview);

export const reviewsRoute = router;
