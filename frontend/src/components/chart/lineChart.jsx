'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatNumber } from '@/lib/utils';

const LineChart = ({ xAxisValues, yAxisValues, idxOfGreatestValueDrop }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Determine colors for the dataset
      const borderColors = xAxisValues.map((km) =>
        km >= xAxisValues[idxOfGreatestValueDrop] && km <= xAxisValues[idxOfGreatestValueDrop + 1] ? 'red' : 'rgb(75, 192, 192)'
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
                  return xAxisValues[index] > xAxisValues[idxOfGreatestValueDrop] && xAxisValues[index] <= xAxisValues[idxOfGreatestValueDrop + 1]
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
                  return `$${formatNumber(value)}`;
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
  }, [xAxisValues, yAxisValues, idxOfGreatestValueDrop]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default LineChart;
