import Report from "../models/reportSchema.js";
import connectToDb from "./connectToDb.js";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();

const seedOneReport = async () => {
  try {
    await connectToDb();

    const existingReports = await Report.countDocuments();

    if (existingReports === 0) {
      const reportData = {
        certificateNumber: "VH001",
        approvedOn: new Date("2025-02-19T00:00:00.000Z"),
        manufacturer: "Toyota",
        motorVehicle: "Sedan",
        category: "M1",
        variantModel: "Camry",
        production: "2024",
        producedInAfter: "2023",
        vin: "JTDBE32KX40215879",
        specifications: {
          weights: {
            maxVehicleWeight: 2000,
            curb: 1500,
          },
          maxAxleWeight: {
            front: 1000,
            rear: 1000,
          },
          dimensions: {
            length: 4500,
            width: 1800,
            height: 1500,
          },
          wheelBase: {
            f1r1: 2700,
          },
          track: {
            front: 1500,
            rear: 1500,
          },
          bodyAndSeating: {
            typeOfBody: "Sedan",
            numberOfSeats: 5,
          },
          engine: {
            engineType: "Gasoline",
            cylinders: 4,
            displacement: 2000,
            airIntake: "Natural",
            netEnginePower: "150 HP",
            pollutantLimit: "Euro 6",
            transmission: "Automatic",
            sosSystem: "Yes",
          },
          brakes: {
            serviceBrakes: "Hydraulic",
            emergencyBrake: "Electronic",
          },
        },
        fuelEconomy: {
          motorVehicleClass: "Passenger",
          feCombined: "16.5 kmpl",
        },
      };

      const newReport = new Report(reportData);
      const qrCode = await QRCode.toDataURL(
        `${process.env.CLIENT_URI}/${newReport._id}`
      );
      newReport.qrCode = qrCode;

      await newReport.save();
      console.log("Sample vehicle has been seeded successfully!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding vehicle:", error);
    process.exit(1);
  }
};

seedOneReport();
