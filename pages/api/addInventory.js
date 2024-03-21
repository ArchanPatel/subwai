import { connectToDB } from "@utils/database";
import Product from "@models/product";
import Inventory from "@models/inventory";
import RequiredInventory from "@models/requiredInventory";
import convertWeightToBoxes from "@utils/converters";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectToDB(); // Connect to MongoDB

    try {
        const { products } = req.body;

        // Loop through each product in the request
        for (const { product, quantity } of products) {
            // Check if the product exists for the user in the products table
            let existingProduct = await Product.findOne({ name: product });

            if (!existingProduct) {
                // If the product doesn't exist, create a new entry in the products table
                existingProduct = await Product.create({ name: product });
            }

            let existingRequiredInventory = await RequiredInventory.findOne({ productId: existingProduct._id });

            if (!existingRequiredInventory) {
                // If the product doesn't exist, create a new entry in the products table
                existingRequiredInventory = await RequiredInventory.create({ productId: existingProduct._id  });
            }

            // Create a record in the inventory table for the product
            await Inventory.create({
                productId: existingProduct._id,
                quantity: convertWeightToBoxes(existingProduct.name, quantity),
            });
        }

        return res.status(200).json({ message: "Products added successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}