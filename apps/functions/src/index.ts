import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import carRoutes from "../routes/carRoutes";

export const app = express();

app.use(express.json());
app.use("/", carRoutes);

export const api = onRequest(app);
