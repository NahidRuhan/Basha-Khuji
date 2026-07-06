import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { landlordController } from "./landlord.controller";

const router = Router()

router.post("/properties",auth(UserRole.LANDLORD),landlordController.createProperty)
router.put("/properties/:propertyId",auth(UserRole.LANDLORD),landlordController.updateProperty)
router.delete("/properties/:propertyId",auth(UserRole.LANDLORD),landlordController.deleteProperty)

// GET	/api/landlord/requests	Get all rental requests for landlord's properties
// PATCH	/api/landlord/requests/:id	Approve or reject a rental request

export const landlordRoutes = router