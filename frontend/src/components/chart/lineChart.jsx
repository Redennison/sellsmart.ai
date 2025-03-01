'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ maxKm, curKm, step, highlightRange = [100000, 150000] }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Generate data points
      let xAxisValues = [];
      let yAxisValues = [];
      for (let i = curKm; i <= maxKm; i += step) {
        xAxisValues.push(i);
        yAxisValues.push(maxKm - i + Math.floor(Math.random() * 2501));
      }

      // Determine colors for the dataset
      const borderColors = xAxisValues.map((km) =>
        km >= highlightRange[0] && km <= highlightRange[1] ? 'red' : 'rgb(75, 192, 192)'
      );

      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new Chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: xAxisValues,
          datasets: [
            {
              label: 'Car Price',
              data: yAxisValues,
              borderColor: borderColors,
              segment: {
                borderColor: ctx => {
                  const index = ctx.p1DataIndex;
                  return xAxisValues[index] >= highlightRange[0] && xAxisValues[index] <= highlightRange[1]
                    ? 'red'
                    : 'rgb(75, 192, 192)';
                },
              },
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
              min: 0,
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
  }, [maxKm, curKm, step, highlightRange]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default LineChart;
