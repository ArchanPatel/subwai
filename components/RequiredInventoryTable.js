"use client";

import { useEffect, useState } from 'react';

const RequiredInventoryTable = () => {
    const [requiredInventoryData, setRequiredInventoryData] = useState([]);

    useEffect(() => {
        const fetchRequiredInventoryData = async () => {
            try {
                const response = await fetch('/api/getRequiredInventory');
                const data = await response.json();
                setRequiredInventoryData(data);
            } catch (error) {
                console.error("Error fetching required inventory data:", error);
            }
        };

        fetchRequiredInventoryData();
    }, []);

    return (
        <div>
            <h2>Required Inventory Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Required Quantity</th>
                </tr>
                </thead>
                <tbody>
                {requiredInventoryData.map(item => (
                    <tr key={item.productName}>
                        <td>{item.productName}</td>
                        <td>{item.requiredInv}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequiredInventoryTable;