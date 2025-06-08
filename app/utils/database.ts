import mongoose from "mongoose";

export const DatabaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log(`MongoDB Connected Successfully ${mongoose.connection.host}`);
  } catch (error: any) {
    console.log(error?.message);
    process.exit(1);
  }
};
