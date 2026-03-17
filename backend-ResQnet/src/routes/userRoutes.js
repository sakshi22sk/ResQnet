/**
 * src/routes/userRoutes.js
 * Admin: Fetch all users (basic info)
 */
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/authorizeRoles");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

router.get("/", auth, authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const users = await User.find().select("name email phone role createdAt");
  return successResponse(res, "Users fetched successfully", users);
}));



module.exports = router;
