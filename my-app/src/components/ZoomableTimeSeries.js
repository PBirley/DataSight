import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { sampleData } from '../data/sample_data';

let newArr = sampleData.map((innerArr) => {
  return [innerArr[0], innerArr[1]]
});
// console.log(newArr);


export default function ZoomableTimeSeries() {
  const series = [{
    data: newArr
  }]
  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    // title: {
    //   text: 'Stock Price Movement',
    //   align: 'left'
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      // labels: {
      //   formatter: function (val) {
      //     return (val / 1000000).toFixed(0);
      //   },
      // },
      title: {
        text: 'Number of people per 10s'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      // shared: false,
      // y: {
      //   formatter: function (val) {
      //     return (val / 1000000).toFixed(0)
      //   }
      // }
      // dataLabels: 'Number of people'
    }
  };
  return (
            

    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>  
  )
}
