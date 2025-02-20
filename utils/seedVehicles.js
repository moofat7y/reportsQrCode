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
        certificateNumber: "ABC123456",
        approvedOn: new Date("2024-01-15T00:00:00Z"),
        manufacturer: "Toyota",
        motorVehicle: "Motor Vehicle",
        category: "SUV",
        variantModel: "RAV4",
        production: "Mass Production",
        producedInAfter: "2023",
        vin: "1HGCM82633A123456",
        specifications: {
          weights: {
            maxVehicleWeight: 2500,
            curb: 1500,
          },
          maxAxleWeight: {
            front: 1200,
            rear: 1300,
          },
          dimensions: {
            length: 4600,
            width: 1800,
            height: 1700,
          },
          wheelBase: {
            f1r1: 2700,
          },
          track: {
            front: 1550,
            rear: 1560,
          },
          bodyAndSeating: {
            typeOfBody: "SUV",
            numberOfSeats: 5,
          },
          engine: {
            engineType: "Inline-4",
            cylinders: 4,
            displacement: 2000,
            airIntake: "Turbocharged",
            netEnginePower: "150 kW",
            engineRPM: "6000",
            pollutantLimit: "Euro 6",
            transmission: "Automatic",
            sosSystem: "Enabled",
          },
          brakes: {
            serviceBrakes: "Disc",
            emergencyBrake: "ABS",
          },
        },
        fuelEconomy: {
          motorVehicleClass: "Compact SUV",
          feCombined: "30 MPG",
        },
        complianceInfo: "Meets all regulatory standards",
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
