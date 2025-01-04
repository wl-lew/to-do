import express from "express";
import dotenv from "dotenv";
import databaseConnect from "../db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());

(async () => {
    await databaseConnect();
})();

app.get("/", (req, res) => {
    res.send("API is running and DB is connected!");
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});