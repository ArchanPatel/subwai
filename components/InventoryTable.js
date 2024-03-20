"use client";
import React, { useState, useEffect } from 'react';

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [cases, setCases] = useState([]);
    const [bags, setBags] = useState([]);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch('/api/getInventory');
            const data = await response.json();

            // Calculate cases and bags based on specific quantities for each product
            const casesData = data.map(item => {
                switch (item.productName) {
                    case "Dill Pickles":
                        return Math.floor((item.quantity*0.035274) / (8 * 80));
                    case "Jalapeno Peppers":
                        return Math.floor((item.quantity*0.035274) / (4 * 80));
                    case "Black Olives":
                    case "Green Olives":
                        return Math.floor((item.quantity*0.035274) / (10 * 33));
                    default:
                        return 0;
                }
            });
            
            const bagsData = data.map(item => {
                switch (item.productName) {
                    case "Dill Pickles":
                        return Math.round(((item.quantity*0.035274) % (8 * 80)) / 80);
                    case "Jalapeno Peppers":
                        return Math.round(((item.quantity*0.035274) % (4 * 80)) / 80);
                    case "Black Olives":
                    case "Green Olives":
                        return Math.round(((item.quantity*0.035274) % (10 * 33)) / 33);
                    default:
                        return 0;
                }
            });

            setCases(casesData);
            setBags(bagsData);
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
            <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Live Inventory</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='button' onClick={fetchInventoryData} className='black_btn'>
                    Refresh
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Case</th>
                        <th>Bag</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map((item, index) => (
                        <tr key={item.productName}>
                            <td>{item.productName}</td>
                            <td>{cases[index]}</td>
                            <td>{bags[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
