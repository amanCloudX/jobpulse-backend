import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  applyJob,
  deleteApplication,
  getApplicantsForJob,
  getMyApplication,
  UpdateApplicationStatus,
} from "../controllers/applicationController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/applyjob/:jobId", protect, upload.single("resume"), applyJob);
router.get("/myapplications", protect, getMyApplication);
router.get(
"/applicantsforjob/:jobId",
  protect,
  authorize("recruiter"),
  getApplicantsForJob,
);
router.put(
  "/updateapplicationstatus/:applicationId",
  protect,
  authorize("recruiter"),
  UpdateApplicationStatus,
);

router.delete("/deleteapplicant/:applicationId", protect,
  authorize("recruiter"),deleteApplication)

export default router;
