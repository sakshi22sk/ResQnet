// src/routes/publicRoutes.js
import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import User from "../models/User.js";
import Report from "../models/Report.js";

const router = express.Router();

router.get("/stats", asyncHandler(async (req, res) => {
  const [totalUsers, verifiedVolunteers, totalReports] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ "volunteerProfile.verified": true }),
    Report.countDocuments(),
  ]);

  return successResponse(res, "Public stats fetched successfully", {
    totalUsers,
    verifiedVolunteers,
    totalReports,
  });
}));

module.exports =  router;
