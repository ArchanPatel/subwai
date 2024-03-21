"use client";
import React, { useState, useEffect } from 'react';

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [cases, setCases] = useState([]);
    const [bags, setBags] = useState([]);
    const [casesUnitData, setCasesUnitData] = useState([]);
    const [bagsUnitData, setBagsUnitData] = useState([]);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch('/api/getInventory');
            const data = await response.json();

            // Calculate cases and bags based on specific quantities for each product
            const casesData = data.map(item => {
                return Math.floor(item.quantity)
            });
            
            const bagsData = data.map(item => {
                switch (item.productName) {
                    case "Dill Pickles":
                        return Math.round(item.quantity % 1 * 8)
                    case "Banana Peppers":
                        return Math.round(item.quantity % 1 * 4)
                    case "Black Olives":
                    case "Green Olives":
                        return Math.round(item.quantity % 1 * 10)
                    default:
                        return 0;
                }
            });

            const casesUnitData = data.map(item => {
                if (Math.floor(item.quantity) == 0) {
                    return ""
                } else {
                    switch (item.productName) {
                        case "Dill Pickles":
                            return "(8 bags/case)"
                        case "Banana Peppers":
                            return "(4 bags/case)"
                        case "Black Olives":
                        case "Green Olives":
                            return "(10 bags/case)"
                        default:
                            return "";
                    }
                }
            });

            const bagsUnitData = data.map(item => {
                switch (item.productName) {
                    case "Dill Pickles":
                        return "(80 oz/bag)"
                    case "Banana Peppers":
                        return "(80 oz/bag)"
                    case "Black Olives":
                    case "Green Olives":
                        return "(33 oz/bag)"
                    default:
                        return "";
                }
            });

            setCases(casesData);
            setBags(bagsData);
            setInventoryData(data);
            setCasesUnitData(casesUnitData);
            setBagsUnitData(bagsUnitData);
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
                            <td>{cases[index] + " "}<i>{casesUnitData[index]}</i></td>
                            <td>{bags[index] + " "}<i>{bagsUnitData[index]}</i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
