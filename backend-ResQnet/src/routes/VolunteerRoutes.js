/**
 * src/routes/volunteerRoutes.js
 */
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const ApiError = require("../utils/errors");
const authorizeRoles = require("../middlewares/authorizeRoles");
const { successResponse } = require("../utils/response");
const User = require("../models/User");
const {
  registerAsVolunteer,
  updateVolunteerProfile,
  listVolunteers
} = require("../controllers/volunteerController");
const asyncHandler = require("../utils/asyncHandler");

// 📸 Volunteer registration with ID proof upload
router.post(
  "/register",
  auth,
  authorizeRoles("user"),
  upload.single("idProof"),
  registerAsVolunteer
);

// ✏️ Volunteer profile update
router.patch(
  "/update",
  auth,
  authorizeRoles("volunteer"),
  updateVolunteerProfile
);

// 👁️ Admin-only volunteer listing
router.get(
  "/",
  auth,
  authorizeRoles("admin"),
  listVolunteers
);

// adminnnnnn

// ✅ Verify / Unverify Volunteer or ID Proof (Admin only)
router.patch("/:id/verify", auth, authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const { verified, type } = req.body;
  const volunteer = await User.findById(req.params.id);

  if (!volunteer || volunteer.role !== "volunteer") {
    throw new ApiError(404, "Volunteer not found");
  }

  if (type === "volunteer") {
    volunteer.volunteerProfile.verified = verified;
  } else if (type === "idProof") {
    volunteer.volunteerProfile.idProof.verified = verified;
  } else {
    throw new ApiError(400, "Invalid verification type");
  }

  await volunteer.save();

  return successResponse(res, `${type === "idProof" ? "ID Proof" : "Volunteer"} verification ${verified ? "approved" : "revoked"} successfully`, volunteer);
}));




module.exports = router;
