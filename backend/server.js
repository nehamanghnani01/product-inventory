import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("server is ready!")
})

app.use(express.json()) // allows to accept JSON data in the req body

//show all the products till now
app.get("/api/products", async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, message: products})
    } catch(error) {
        console.log("Error = ",error)
        res.status(500).json({success: false, message: "Server error"})
    }
})

app.post("/api/products", async(req, res) => {
    const product = req.body //user input 
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please send all the fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch {
        console.error("Error in create product ", error.message)
        res.status(500).json({success: false, message: "Server Error"});
    }
})

//update a product 
app.put("/api/products/:id", async(req,res)=> {
    const {id} = req.params
    console.log("id = ",id)
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: updatedProduct})
    } catch(error) {
        console.log("Error =", error)
        res.status(500).json({success: false, message: "Server Error"})
    }
})

//delete the product - to delete we have to pass the 'id' of the product 
app.delete("/api/products/:id", async(req,res)=> {
    const {id} = req.params
    console.log("id is",id)

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message:"Product deleted"})
    } catch(error){
        console.log("error - ", error);
        res.status(400).json({success:false, message: "Product not found!"})
    }
})

console.log(process.env.MONGO_URI)  //the variables in .env can be accessed only when the dotenc module is imported

app.listen(5000, () => {
    
    console.log("server started on port 5000 hello there")
    connectDB()
})

