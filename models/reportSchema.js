import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    unique: true,
  },
  approvedOn: {
    type: Date,
  },
  manufacturer: {
    type: String,
  },
  motorVehicle: {
    type: String,
    default: "Moter Vehicle",
  },
  category: {
    type: String,
  },
  variantModel: {
    type: String,
  },
  production: {
    type: String,
  },
  producedInAfter: {
    type: String,
  },
  vin: {
    type: String,
  },
  specifications: {
    weights: {
      maxVehicleWeight: Number,
      curb: Number,
    },
    maxAxleWeight: {
      front: Number,
      rear: Number,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    wheelBase: {
      f1r1: Number,
    },
    track: {
      front: Number,
      rear: Number,
    },
    bodyAndSeating: {
      typeOfBody: String,
      numberOfSeats: Number,
    },
    engine: {
      engineType: String,
      cylinders: Number,
      displacement: Number,
      airIntake: String,
      netEnginePower: String,
      engineRPM: String,
      pollutantLimit: String,
      transmission: String,
      sosSystem: String,
    },
    brakes: {
      serviceBrakes: String,
      emergencyBrake: String,
    },
  },
  fuelEconomy: {
    motorVehicleClass: String,
    feCombined: String,
  },
  qrCode: {
    type: String,
    required: true,
  },
  complianceInfo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the timestamp when document is modified
reportSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
