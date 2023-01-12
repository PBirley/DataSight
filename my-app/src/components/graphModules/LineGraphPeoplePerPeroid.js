import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { countPeoplePerPeroid } from '../../data-service';

export default function LineGraphPeoplePerPeroid() {
  const [peoplePerPeroidData, setPeoplePerPeroidData] = useState([])

  const data = useSelector(state => state.streamingData)

  /* 
    TODO: peroid should vary on length of data (or user input)
  */
  useEffect(() => {
    setPeoplePerPeroidData(countPeoplePerPeroid(data))
  }, [data])


  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: false
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
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
      title: {
        text: 'Number of people per 10s'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      dataLabels: 'Number of people'
    }
  };

  return (
    <div id="chart">
    <ReactApexChart 
      options={options} 
      series={[{data: peoplePerPeroidData.length > 1 ? peoplePerPeroidData : [[0,0], [0,0]]}]} 
      type="area" 
      height={350} />
  </div>  
  )
}
