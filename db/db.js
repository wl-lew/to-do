import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.MONGO_URI;

const databaseConnect = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("DB is connected!");
    }
    catch (err) {
        console.error("Error with DB connection!", err);
        process.exit(1);
    }
}

export default databaseConnect;