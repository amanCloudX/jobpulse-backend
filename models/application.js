import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // kis job ke liye apply kiya
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // kis user ne apply kiya
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // resume link
    resume: {
      type: String,
    },

    // Application status
    status: {
      type: String,
      enum: ["applied", "interview", "rejected"],
       default: "applied",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);