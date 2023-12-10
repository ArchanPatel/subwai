'use client';
import { useEffect } from 'react';

const page = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    const timeSavedData = [10, 20, 30, 25, 35];
    const ingredientsSavedData = [8, 15, 20, 18, 25];

    useEffect(() => {
        const drawChart = (canvasId, title, y_axis_label, data, label) => {
          const canvas = document.getElementById(canvasId);
          const ctx = canvas.getContext('2d');

          const chartHeight = canvas.height - 40;
          const chartWidth = canvas.width - 40;

          ctx.beginPath();
          ctx.moveTo(40, canvas.height - 20);
          ctx.lineTo(40, 20);
          ctx.lineTo(canvas.width - 20, canvas.height - 20);
          ctx.strokeStyle = '#ddd';
          ctx.stroke();

          const stepSize = Math.max(...data) / chartHeight;

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
          ctx.lineWidth = 2;
          for (let i = 0; i < data.length; i++) {
              const x = i * (chartWidth / (data.length - 1)) + 40;
              const y = canvas.height - 20 - data[i] / stepSize;

              if (i === 0) {
                  ctx.moveTo(x, y);
              } else {
                  ctx.lineTo(x, y);
              }
              ctx.fillText(label[i], x, canvas.height - 5);
          }
          ctx.stroke();

          // Chart title
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(title, canvas.width / 2, 20);

          // X-axis label
          ctx.font = '12px Arial';
          ctx.fillStyle = '#333';
          ctx.fillText('Weeks', canvas.width / 2, canvas.height - 5);

          // Y-axis label
          ctx.save();
          ctx.translate(10, canvas.height / 2);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(y_axis_label + ' Saved', 0, 0);
          ctx.restore();
        };

        drawChart('timeSavedChart', 'Time Saved From Auto Inventory', 'Time', timeSavedData, weeks);
        drawChart('ingredientsSavedChart', 'Ingredients Saved From Auto Inventory','Ingredients', ingredientsSavedData, weeks);
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <canvas id="timeSavedChart" width="400" height="300"></canvas>
            <canvas id="ingredientsSavedChart" width="400" height="300"></canvas>
        </div>
    );
};

export default page;
