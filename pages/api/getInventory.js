import { connectToDB } from "../../utils/database";
import Inventory from "../../models/inventory";
import Product from "../../models/product";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectToDB(); // Connect to MongoDB

    try {
        const products = await Product.find({}, '_id name'); // Retrieve all products

        // Get the latest inventory data for each product
        const inventoryData = await Promise.all(products.map(async (product) => {
            const latestEntry = await Inventory.findOne({ productId: product._id })
                .sort({ timestamp: -1 })

            return {
                productName: product.name,
                quantity: latestEntry.quantity,
            };
        }));

        return res.status(200).json(inventoryData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
