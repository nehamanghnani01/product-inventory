import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("server is ready!")
})

app.post("/products", async(req, res) => {
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



console.log(process.env.MONGO_URI)  //the variables in .env can be accessed only when the dotenc module is imported

app.listen(5000, () => {
    
    console.log("server started on port 5000 hello there")
    connectDB()
})

