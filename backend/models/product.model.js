import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    image: {
        type: String, 
        required: true
    }, 
}, {
    timestamps: true
});

//create a collection called 'Product' and each doc of the collection should follow the schema
const Product = mongoose.model('Product', productSchema);

export default Product;