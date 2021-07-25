import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';

import { StyledList as StyledChart } from '../../../styles/list';

const BOOKING_BUCKETS = {
  'Cheap': { min: 0, max: 100, color: 'rgba(0, 230, 64, 0.4)' },
  'Mid-range': { min: 100, max: 200, color: 'rgba(248, 148, 6, 0.4)' },
  'Expensive': { min: 200, max: 999999999, color: 'rgba(207, 0, 15, 0.4)' }
};

const BookingChart = props => {
  const chartData = { labels: [], datasets: [] };
  const values = [];
  const colors = [];

  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price >= BOOKING_BUCKETS[bucket].min &&
        current.event.price < BOOKING_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    colors.push(BOOKING_BUCKETS[bucket].color);
  }

  chartData.datasets.push({
    label: ' Number of Bookings',
    data: values,
    backgroundColor: colors,
    barThickness: 'flex',
    maxBarThickness: 90,
    borderColor: '#95a5a6',
    borderWidth: 1
  });

  const chartOptions = {
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 14,
      text: '# of Bookings per Price Category'
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          precision: 0,
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <StyledChart Chart>
      <BarChart data={chartData} options={chartOptions} />
    </StyledChart>
  );
};

export default BookingChart;
