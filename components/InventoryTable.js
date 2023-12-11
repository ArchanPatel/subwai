"use client";

import { useEffect, useState } from 'react';

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await fetch('/api/getInventory');
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchInventoryData();
    }, []);

    return (
        <div>
            <h2>Inventory Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {inventoryData.map(item => (
                    <tr key={item.productName}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;