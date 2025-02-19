import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  approvedOn: {
    type: Date,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  motorVehicle: {
    type: String,
    required: true,
    default: "Moter Vehicle",
  },
  category: {
    type: String,
    required: true,
  },
  variantModel: {
    type: String,
    required: true,
  },
  production: {
    type: String,
    required: true,
  },
  producedInAfter: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
    required: true,
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
