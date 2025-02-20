import express from "express";
import {
  addReport,
  editReport,
  getAllReports,
  getReportById,
  deleteReportById,
} from "../controllers/reportController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.delete("/:id", isAuth, deleteReportById);
router.post("/add", isAuth, addReport);
router.put("/edit/:id", isAuth, editReport);

export default router;
