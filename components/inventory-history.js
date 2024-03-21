"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Registering the necessary components for a line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InventoryHistory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [inventoryHistory, setInventoryHistory] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    axios.get('/api/getProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch inventory history when a product is selected
  useEffect(() => {
    if (selectedProductId) {
      axios.get(`/api/inventory-history-api?productId=${selectedProductId}`)
        .then(res => setInventoryHistory(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedProductId]);

  // Handle product selection change
  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  // Prepare data for the graph
  const chartData = {
    labels: inventoryHistory.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'Inventory Levels',
      data: inventoryHistory.map(entry => entry.quantity),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Inventory History</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <select onChange={handleProductChange} value={selectedProductId}>
          <option value="">Select a Product</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>{product.name}</option>
          ))}
        </select>
      </div>

      {inventoryHistory.length > 0 && (
        <>
          <Chart type="line" data={chartData} />
        </>
      )}
    </div>
  );
};

export default InventoryHistory;

