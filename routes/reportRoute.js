import express from "express";
import {
  addReport,
  editReport,
  getAllReports,
  getReportById,
} from "../controllers/reportController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/add", isAuth, addReport);
router.put("/edit/:id", isAuth, editReport);

export default router;
