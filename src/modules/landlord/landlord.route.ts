import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { landlordController } from "./landlord.controller";

const router = Router()

router.post("/properties",auth(UserRole.LANDLORD),landlordController.createProperty)
router.put("/properties/:propertyId",auth(UserRole.LANDLORD),landlordController.updateProperty)
router.delete("/properties/:propertyId",auth(UserRole.LANDLORD),landlordController.deleteProperty)
router.get("/requests",auth(UserRole.LANDLORD),landlordController.getAllRequest)
router.patch("/requests/:requestId",auth(UserRole.LANDLORD),landlordController.updateRequest)

export const landlordRoutes = router