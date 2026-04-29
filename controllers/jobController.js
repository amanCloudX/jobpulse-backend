import { Job } from "../models/job.js";

//Create Job Recruiter only
export const createJob = async (req, res, next) => {
  try {
    const { title, company, description, location, salary, jobType } = req.body;

    if (!title || !company || !description || !location) {
      return res.status(400).json({ message: "Required Fields Missing" });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      jobType,
      postedBy: req.user.id,
    });

    return res.status(201).json({ message: "Job Created", job });
  } catch (error) {
    next(error);
  }
};

//Get Jobs Anyone Can Access
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

//Get Single Job
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email",
    );

    if (!job) {
      return res.status(404).json({ message: "Job Not Found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

//Update Job only Owner
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // check owner
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // ❌ typo fix: indByIdAndUpdate → findByIdAndUpdate
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Job Updated",
      updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Job
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job Not Found" });
    }

    // check ownership
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    await job.deleteOne();

    return res.status(200).json({ message: "Job Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//Get My Jobs
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
