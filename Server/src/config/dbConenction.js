import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Access the MongoDB URI using process.env
const mongoUri = process.env.VITE_MONGO_URI; // Use process.env instead of import.meta.env
if (!mongoUri) {
  console.error("MongoDB URI not defined in environment variables");
  process.exit(1);
}

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};
