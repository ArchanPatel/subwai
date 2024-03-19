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
            <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Required Inventory</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Required Inventory</th>
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