import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { parseAgeData } from '../../data-service';

export default function BarChartAges({data}) {
  const [ageData, setAgeData] = useState([0,0,0,0,0]);
  
  useEffect(() => {
    setAgeData(parseAgeData(data))
  }, [data]);
  
  const options = { 
    title: {text: 'Detections by Age Bracket'},
    xaxis:{
      categories: ['0-20', '21-30', '31-40', '41-60', '60+'],
      title: {text: 'Detections'}
    },
    yaxis:{
      title: {text: 'Age Ranges'}
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
  };

  return (
    <div id="chart">
      <ReactApexChart 
        options={options} 
        series={[{data:ageData}]} 
        type="bar" 
      />
  </div>
  )
}
