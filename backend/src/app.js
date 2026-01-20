import express from "express";
import cors from "cors";
import recordRoutes from "./routes/record.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/records", recordRoutes);


export default app;
