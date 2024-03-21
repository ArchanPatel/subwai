const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

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

module.exports = Product;
