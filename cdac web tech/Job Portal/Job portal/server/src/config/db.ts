import mongoose from "mongoose";

export const connectionDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not defined in .env file");
        }

        await mongoose.connect(mongoUrl);

        console.log("MongoDB connected successfully!");

    } catch (error) {
        console.log("MongoDB connection failed:", error);

        process.exit(1);
    }
};