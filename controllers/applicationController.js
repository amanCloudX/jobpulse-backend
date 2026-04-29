import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

//Apply Job
export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json("Job Not Found");
    }

    const existingApplicant = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (existingApplicant) {
      res.status(400).json({ message: "Already Applied" });
    }

    const resume = req.file ? req.file.path : null;

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume,
    });

    res.status(200).json({ message: "Applied Succesfully", application });
  } catch (error) {
    next(error);
  }
};

//Get my application
export const getMyApplication = async (req, res, next) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

//Get Applicants For A Job
export const getApplicantsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

//Update Application Status

export const UpdateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      res.status(404).json("Application Not Found");
    }

    application.status = status;
    await application.save();
    res.status(200).json({
      message: "Status Updated",
      application,
    });
  } catch (error) {
    next(error);
  }
};
