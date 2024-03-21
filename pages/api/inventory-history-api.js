// pages/api/inventory-history-api.js
import { connectToDB } from "@utils/database";
import Inventory from "@models/inventory";

export default async function handler(req, res) {
    await connectToDB();

    if (req.method === "GET") {
        console.log(req)
        try {
            const { productId } = req.query; // Extract productId from query parameters

            if (!productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            const inventoryHistory = await Inventory.find({ productId: productId }).sort({ timestamp: -1 });

            if (inventoryHistory.length === 0) {
                return res.status(404).json({ message: "No inventory history found for the provided product ID" });
            }

            return res.status(200).json(inventoryHistory);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
