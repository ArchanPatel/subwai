"use client";
import React, { useState, useEffect } from 'react';

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([]);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch('/api/getInventory');
            const data = await response.json();
            setInventoryData(data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    useEffect(() => {
        fetchInventoryData();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Inventory</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='button' onClick={fetchInventoryData} className='black_btn'>
                    Refresh
                </button>
            </div>
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
