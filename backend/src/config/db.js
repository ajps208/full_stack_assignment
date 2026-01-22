import mongoose from "mongoose";

// Connect to DB
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};
