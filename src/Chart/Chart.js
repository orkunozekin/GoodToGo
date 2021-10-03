import React from 'react'
import { Line } from 'react-chartjs-2'

import './Chart.css'

const data = {
  labels: ['July 29', 'July 30', 'July 31', 'August 01', 'August 02'],
  datasets: [
    {
      type: 'line',
      label: 'Certificates Estimated',
      data: [930.784985, 1283.14931, 1211.207325, 1084.803212, 892.999637],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    }, {
      type: 'line',
      label: 'Certificates Purchased',
      data: [29.574118, 42.6275667, 50.943793, 40.907479, 28.215573],
      fill: false,
      borderColor: 'rgb(54, 162, 235)'
    }
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Chart = () => {
  return (
    <div className="line-chart-wrapper">
      <h2>Daily API Usage</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default Chart
