/**
 * src/models/Feedback.js
 * Stores user feedback for incidents.
 */

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // from your unified User model
      default: null,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
