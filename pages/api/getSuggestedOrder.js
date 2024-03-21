import { connectToDB } from "@utils/database";
import Product from "@models/product";
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

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            // Find all inventory entries for the product in the past month
            const entries = await Inventory.find({
                productId: product._id,
                timestamp: { $gte: oneMonthAgo }
            });

            // Calculate the average quantity from these entries
            let totalQuantity = 0;
            entries.forEach(entry => {
                totalQuantity += entry.quantity;
            });

            // Ensure division by zero doesn't occur
            const averageQuantity = entries.length > 0 ? totalQuantity / entries.length : 0;

            // Set the calculated average as 'suggested'
            let suggested = Math.ceil(averageQuantity - latestEntry.quantity) > 0 ? Math.ceil(averageQuantity - latestEntry.quantity) : 0;

            return {
                productName: product.name,
                quantity: Number(latestEntry.quantity.toFixed(1)),
                suggested: suggested,
            };
        }));

        return res.status(200).json(suggestedOrderData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}