import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./jobs/batchJob.js";

// Connect to DB
connectDB();

app.listen(process.env.PORT || 5000, () => {console.log("Server running on port 5000");});
