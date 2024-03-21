import { connectToDB } from "@utils/database";
import Inventory from "@models/inventory";

export default async function handler(req, res) {    
    await connectToDB(); // Connect to MongoDB

    if (req.method === "GET") {
        try {
            const { productId } = req.query; // Assuming the product ID is passed as a query parameter

            // Validate productId is provided
            if (!productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            // Fetch inventory history for the given product ID
            const inventoryHistory = await Inventory.find({ productId: productId }).sort({ timestamp: -1 });

            // Check if inventory history exists for the product
            if (inventoryHistory.length === 0) {
                return res.status(404).json({ message: "No inventory history found for the provided product ID" });
            }

            return res.status(200).json(inventoryHistory);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } else {
        // If the method is not GET, return a Method Not Allowed error
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
