"use client";

import { useEffect, useState } from 'react';

const SuggestedOrderTable = () => {
    const [suggestedOrderData, setSuggestedOrderData] = useState([]);

    useEffect(() => {
        const fetchSuggestedOrderData = async () => {
            try {
                const response = await fetch('/api/getSuggestedOrder');
                const data = await response.json();
                setSuggestedOrderData(data);
            } catch (error) {
                console.error("Error fetching suggested order data:", error);
            }
        };

        fetchSuggestedOrderData();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Suggested Ordering</h1>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Required Quantity</th>
                    <th>Live Inventory</th>
                    <th>Suggested Order Quantity</th>
                </tr>
                </thead>
                <tbody>
                {suggestedOrderData.map(item => (
                    <tr key={item.productName}>
                        <td>{item.productName}</td>
                        <td>{item.requiredInv}</td>
                        <td>{item.quantity}</td>
                        <td>{item.suggested}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuggestedOrderTable;