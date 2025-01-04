import express from "express";
import dotenv from "dotenv";
import routes from "../app/index.js";
import databaseConnect from "../db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());

(async () => {
    await databaseConnect();
})();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});