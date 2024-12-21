'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['0', '10000', '20000', '30000', '40000', '50000', '60000'], // Example x-axis values (in km)
          datasets: [
            {
              label: 'Car Price',
              data: [85000, 80000, 70000, 65000, 56000, 55000, 40000], // Example y-axis values (in price)
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: 'Kilometers',
                font: {
                  size: 14,
                },
                color: 'white',
              },
            },
            y: {
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: 'Price',
                font: {
                  size: 14,
                },
                color: 'white',
              },
              ticks: {
                callback: function (value) {
                  return `$${value}`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      // Cleanup the chart instance on component unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default LineChart;
