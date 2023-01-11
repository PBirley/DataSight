import React from 'react'
import Chart from 'react-apexcharts'

export default function PieChart({ genderData }) {
  const options = { labels: ["Men", "Women"] };


  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={genderData.map((data) => data)}
            type="donut"
            width="300"
          />
        </div>
      </div>
    </div>
  );
}
