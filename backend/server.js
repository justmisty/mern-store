import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import path from "path"; //  Import path module

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //

app.use(express.json()); // allows us accept JSON data in the req.body

app.use("/api/products", productRoutes); // this is the route for our product routes

// configure the app so that both the backend and frontend can be deployed as one project
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // serve production files
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
