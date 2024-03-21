const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const RequiredInventorySchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'}, // Reference to Product table
    requiredInv: { type: Number, default: 0 },
});

let RequiredInventory;

try {
    // Check if the model has already been defined
    RequiredInventory = model("RequiredInventory");
} catch {
    // If not defined, define the model
    RequiredInventory = model("RequiredInventory", RequiredInventorySchema);
}

export default RequiredInventory;