import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Remote",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description:{
        type:String,
        required:true,
          trim: true,
    },
    salary:
    {
        type:Number,
        min:0
    },
    jobType:{
        type:String,
        enum:["full-time","part-time","internship","remote"],
        default:"full-time"
    }
  },
  { timestamps: true },
);
export const Job =
  mongoose.models.Job ||
  mongoose.model("Job", jobSchema);