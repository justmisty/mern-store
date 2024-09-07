import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Create a new product route
router.post("/", addProduct);

//  Get all products route

router.get("/", getProducts);

// Update a product route

router.put("/:id", updateProduct);

//  Delete a product route
router.delete("/:id", deleteProduct);

export default router;
