import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
  getMyJobs,
} from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/job", protect,   authorize("recruiter"),createJob);
router.get("/alljobs", getAllJobs);
router.get("/job/:id", getJobById);
router.put("/job/:id", protect, authorize("recruiter"), updateJob);
router.delete("/job/:id", protect,  authorize("admin", "recruiter"), deleteJob);
router.get("/myjobs", protect, getMyJobs);

export default router;
