import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/promaneger"
    );
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(`Error :${error.message}`);
  }
};
