import { connectToDB } from "@utils/database";
import Product from "@models/product";
import RequiredInventory from "@models/requiredInventory";
import Inventory from "@models/inventory";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectToDB(); // Connect to MongoDB

    try {
        const products = await Product.find({}, '_id name'); // Retrieve all products

        // Get the latest inventory data for each product
        const suggestedOrderData = await Promise.all(products.map(async (product) => {
            const latestEntry = await Inventory.findOne({ productId: product._id })
                .sort({ timestamp: -1 })

            const inv = await RequiredInventory.findOne({ productId: product._id });

            let suggested;

            if (latestEntry.quantity < inv.requiredInv) {
                suggested = inv.requiredInv - latestEntry.quantity
            } else {
                suggested = 0
            }

            return {
                productName: product.name,
                requiredInv: inv.requiredInv,
                quantity: latestEntry.quantity,
                suggested: suggested,
            };
        }));

        return res.status(200).json(suggestedOrderData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}