import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/register",userController.registerUser)
router.get("/",auth(UserRole.ADMIN),userController.getAllUser)

export const userRoutes = router;