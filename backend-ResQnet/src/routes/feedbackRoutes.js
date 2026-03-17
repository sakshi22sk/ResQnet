// /**
//  * src/routes/feedbackRoutes.js
//  * Handles user feedback submission for incidents.
//  */

// const express = require("express");
// const router = express.Router();

// const Feedback = require("../models/Feedback");
// const Report = require("../models/Report");
// const User = require("../models/User");

// const auth = require("../middlewares/auth"); // optional: if only logged-in users can submit feedback
// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse, errorResponse } = require("../utils/response");

// /**
//  * @route   POST /api/feedback
//  * @desc    Submit feedback for an incident
//  * @access  Authenticated users (public optional)
//  */
// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { incidentId, volunteerId, rating, remarks } = req.body;

//     console.log("🧾 Incoming feedback data:", req.body);

//     if (!incidentId || rating === undefined) {
//       console.log("❌ Missing required fields");
//       return errorResponse(res, 400, "Incident ID and rating are required.");
//     }

//     // 🔍 Try to find incident
//     const incident = await Report.findById(incidentId).catch(err => {
//       console.error("❌ Report.findById error:", err);
//       throw new Error("Report lookup failed");
//     });

//     if (!incident) {
//       console.log("❌ Incident not found for ID:", incidentId);
//       return errorResponse(res, 404, "Incident not found.");
//     }

//     // 🔍 Check volunteer (if provided)
//     if (volunteerId) {
//       const volunteer = await User.findById(volunteerId).catch(err => {
//         console.error("❌ Volunteer lookup error:", err);
//         throw new Error("Volunteer lookup failed");
//       });
//       if (!volunteer) {
//         console.log("⚠️ Volunteer not found for ID:", volunteerId);
//         return errorResponse(res, 404, "Volunteer not found.");
//       }
//     }

//     // ✅ Create feedback
//     console.log("🛠️ Creating feedback document...");
//     const feedback = await Feedback.create({
//       incidentId,
//       volunteerId: volunteerId || null,
//       rating: Number(rating),
//       remarks: remarks?.trim() || "",
//     });

//     console.log("✅ Feedback saved successfully:", feedback._id);
//     return successResponse(res, "Feedback submitted successfully.", feedback);
//   })
// );

// module.exports = router;




/**
 * src/routes/feedbackRoutes.js
 * Handles user feedback submission and retrieval for incidents.
 */

const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");
const Report = require("../models/Report");
const User = require("../models/User");

const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback for an incident
 * @access  Authenticated users (public optional)
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { incidentId, volunteerId, rating, remarks } = req.body;

    console.log("🧾 Incoming feedback data:", req.body);

    // ✅ Validate required fields
    if (!incidentId || rating === undefined) {
      return errorResponse(res, 400, "Incident ID and rating are required.");
    }

    // ✅ Check if incident exists
    const incident = await Report.findById(incidentId).catch((err) => {
      console.error("❌ Report.findById error:", err);
      throw new Error("Report lookup failed");
    });

    if (!incident) {
      return errorResponse(res, 404, "Incident not found.");
    }

    // ✅ Validate volunteer if provided
    if (volunteerId) {
      const volunteer = await User.findById(volunteerId).catch((err) => {
        console.error("❌ Volunteer lookup error:", err);
        throw new Error("Volunteer lookup failed");
      });
      if (!volunteer) {
        return errorResponse(res, 404, "Volunteer not found.");
      }
    }

    // ✅ Create new feedback
    const feedback = await Feedback.create({
      incidentId,
      volunteerId: volunteerId || null,
      rating: Number(rating),
      remarks: remarks?.trim() || "",
    });

    console.log("✅ Feedback saved successfully:", feedback._id);
    return successResponse(res, "Feedback submitted successfully.", feedback);
  })
);

/**
 * @route   GET /api/feedback
 * @desc    Get all feedback (admin) or filter by incidentId / volunteerId
 * @query   ?incidentId=<id> or ?volunteerId=<id>
 * @access  Admin or authorized user
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { incidentId, volunteerId } = req.query;
    let filter = {};

    if (incidentId) filter.incidentId = incidentId;
    if (volunteerId) filter.volunteerId = volunteerId;

    console.log("🔍 Fetching feedback with filter:", filter);

    const feedbacks = await Feedback.find(filter)
      .populate("incidentId", "emergencyType status priorityLevel createdAt")
      .populate("volunteerId", "name email role")
      .sort({ createdAt: -1 });

    if (!feedbacks.length) {
      return errorResponse(res, 404, "No feedback found.");
    }

    return successResponse(res, "Feedback fetched successfully.", feedbacks);
  })
);

/**
 * @route   GET /api/feedback/:id
 * @desc    Get a single feedback entry by its ID
 * @access  Admin or owner
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const feedback = await Feedback.findById(id)
      .populate("incidentId", "emergencyType status priorityLevel createdAt")
      .populate("volunteerId", "name email role");

    if (!feedback) {
      return errorResponse(res, 404, "Feedback not found.");
    }

    return successResponse(res, "Feedback fetched successfully.", feedback);
  })
);

module.exports = router;
