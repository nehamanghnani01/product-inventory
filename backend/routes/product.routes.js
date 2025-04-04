import express from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";

const router = express.Router();

//show all the products till now
router.get("/", getProducts)

router.post("/", createProduct)

//update a product 
router.put("/:id", updateProduct)

//delete the product - to delete we have to pass the 'id' of the product 
router.delete("/:id",deleteProduct )

export default router