import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js"

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("server is ready!")
})

app.use(express.json()) // allows to accept JSON data in the req body

app.use("/api/products", productRoutes )

console.log(process.env.MONGO_URI)  //the variables in .env can be accessed only when the dotenc module is imported
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    
    console.log("server started on port "+PORT)
    connectDB()
})

