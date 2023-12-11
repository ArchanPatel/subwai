import { connectToDB } from "@utils/database";
import Product from "@models/product";
import RequiredInventory from "@models/requiredInventory";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectToDB(); // Connect to MongoDB

    try {
        const products = await Product.find({}, '_id name'); // Retrieve all products

        // Get the latest inventory data for each product
        const requiredInventoryData = await Promise.all(products.map(async (product) => {
            const inv = await RequiredInventory.findOne({ productId: product._id });

            return {
                productName: product.name,
                requiredInv: inv.requiredInv, // Default to 0 if no entry found
            };
        }));

        return res.status(200).json(requiredInventoryData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}