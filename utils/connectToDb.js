import mongoose from "mongoose";

const connectToDb = async () => {
  const mongo_dev_uri = process.env.MONGO_URI_DEV;
  const mongo_production_uri = process.env.MONGO_URI;
  const enviroment = process.env.ENV;
  try {
    await mongoose.connect(
      enviroment === "production" ? mongo_production_uri : mongo_dev_uri
    );
    console.log("connected to db");
  } catch (error) {
    throw new Error(error);
  }
};

export default connectToDb;
