import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: String
});

let Product;

try {
    // Check if the model has already been defined
    Product = model("Product");
} catch {
    // If not defined, define the model
    Product = model("Product", ProductSchema);
}

export default Product;