import Report from "../models/reportSchema.js";
import QRCode from "qrcode";

// Get all reports
export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

// Get report by ID
export const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      const error = new Error("Report not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// Add new report with QR code
export const addReport = async (req, res, next) => {
  try {
    const vehicleData = req.body;
    const newReport = new Report(vehicleData);

    // Generate QR code with the report URL
    const vehicleUrl = `${process.env.CLIENT_URI}/${newReport._id}`;
    const qrCode = await QRCode.toDataURL(vehicleUrl);

    // Update the report with QR code
    newReport.qrCode = qrCode;
    const savedReport = await newReport.save();
    // Save report first to get the ID
    res.status(201).json({
      success: true,
      message: "Report added successfully with QR code",
      data: savedReport,
      qrCode: qrCode,
    });
  } catch (error) {
    next(error);
  }
};

// Edit report
export const editReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedReport) {
      const error = new Error("Report not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    next(error);
  }
};
