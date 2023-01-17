import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { countPeoplePerPeroid } from '../../data-service';

export default function LineGraphPeoplePerPeroid({data}) {
  const [peoplePerPeroidData, setPeoplePerPeroidData] = useState([])
  const [peroid, setPeroid] = useState(1);


  useEffect(() => {

    if (data.length > 0) {
      const [counts, peroid] = countPeoplePerPeroid(data);
      setPeoplePerPeroidData(counts);
      setPeroid(peroid);
    }

  }, [data])


  const options = {
    title: {
      text: 'Number of Detections over Time'
    },
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
        text: 'Number of people per ' + Math.round(peroid/1000) + 's'
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
      height={350} 
      />
  </div>  
  )
}
