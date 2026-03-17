/**
 * src/routes/adminRoutes.js
 * Admin stats overview: users, volunteers, reports counts
 */
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/authorizeRoles");
const User = require("../models/User");
const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

router.get("/stats", auth, asyncHandler(async (req, res) => {
  const [totalUsers, totalVolunteers, totalReports, verifiedVolunteers, pendingReports, assignedReports, resolvedReports] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "volunteer" }),
    Report.countDocuments(),
    User.countDocuments({ "volunteerProfile.verified": true }),
    Report.countDocuments({ status: "pending" }),
    Report.countDocuments({ status: "assigned" }),
    Report.countDocuments({ status: "resolved" }),
  ]);

  return successResponse(res, "Admin stats fetched successfully", {
    totalUsers,
    totalVolunteers,
    verifiedVolunteers,
    totalReports,
    pendingReports,
    assignedReports,
    resolvedReports,
  });
}));


module.exports = router;
