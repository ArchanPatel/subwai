import { Schema, model } from 'mongoose';

const InventorySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    timestamp: { type: Date, default: Date.now },
});

let Inventory;

try {
    // Check if the model has already been defined
    Inventory = model("Inventory");
} catch {
    // If not defined, define the model
    Inventory = model("Inventory", InventorySchema);
}

export default Inventory;