import React from 'react'
import Chart from 'react-apexcharts'

export default function PeopleGraph() {
  const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: [4,5,8,9,5,3]
    }
  ];
  const options = { //data on the x-axis
    chart: { type: 'area',
      height: 350},
    xaxis: {
      categories: [1,2,3,5,6,7]
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="450"
      />
    </div>
  )
}
