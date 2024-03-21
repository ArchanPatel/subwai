const mongoose = require('mongoose');
const readXlsxFile = require('read-excel-file/node');
const { connectToDB } = require('./database');
const Inventory = require('../models/inventory');
const Product = require('../models/product');

// Excel file path
const filePath = './utils/inventory-history.xlsx';

const collectionstodrop = ["inventories", "requiredinventories", "products"];

const resetDatabase = async () => {
    await connectToDB();

    // Delete all items from the collections
    for (const collection of collectionstodrop) {
        try {
            // Delete all documents in the collection
            const result = await mongoose.connection.collection(collection).deleteMany({});
            console.log(`Deleted all documents from ${collection}. Result:`, result);

            // Now, drop the collection
            await mongoose.connection.dropCollection(collection);
            console.log(`Dropped the ${collection} collection.`);
        } catch (error) {
            if (error.message.toLowerCase().includes('ns not found')) {
                console.log(`The ${collection} collection does not exist, so it was not dropped.`);
            } else {
                console.log(`Error modifying ${collection} collection:`, error.message);
            }
        }
    }

    // Load Excel file and insert inventory data
    readXlsxFile(filePath).then(async (rows) => {
        // Extract dates from the first row (assuming the first row contains dates for inventory entries)
        const dates = rows.shift().slice(1).map(dateString => new Date(dateString));

        // Iterate over rows and create inventory entries
        for (const row of rows) {
            const productName = row[0]; // Product name is in the first column

            // Find or create the product based on the name
            let product = await Product.findOne({ name: productName });
            if (!product) {
                product = await Product.create({ name: productName });
            }

            // Iterate over inventory quantities and corresponding dates
            for (let i = 1; i < row.length; i++) {
                const quantity = row[i];
                const timestamp = dates[i - 1]; // Corresponding date for the inventory entry

                // Create inventory entry with the date
                await Inventory.create({
                    productId: product._id,
                    quantity: quantity,
                    timestamp: timestamp,
                });
            }
        }

        console.log('Database has been updated with inventory data from the Excel file.');

        // After all operations are complete, gracefully close the database connection
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');

        // Now, you can safely exit the script
        process.exit();
    });
};

resetDatabase().catch(console.error);
