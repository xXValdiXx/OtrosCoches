import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import carRoutes from "../routes/carRoutes";
import cors from "cors";

const app = express();

// ✅ Apply CORS before routes
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use("/", carRoutes);

export const api = onRequest(app);
