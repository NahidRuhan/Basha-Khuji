import { Router } from "express";
import { requestController } from "./request.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",auth(UserRole.TENANT),requestController.createRequest)



export const requestRoutes = router;