import { connectToDB } from "@utils/database";
import Product from "@models/product";

export default async function handler(req, res) {
    await connectToDB(); // Connect to MongoDB

    if (req.method === "GET") {
        try {
            // Retrieve all products and select only the '_id' and 'name' fields
            const products = await Product.find({}, '_id name');
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        // If the method is neither GET nor POST, return a Method Not Allowed error
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
