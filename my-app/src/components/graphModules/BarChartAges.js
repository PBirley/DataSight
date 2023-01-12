import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { parseAgeData } from '../../data-service';

export default function BarChartAges() {

  const [ageData, setAgeData] = useState([0,0,0,0,0]);

  const options = { 
    xaxis:{
      categories: ['0-20', '21-30', '31-40', '41-60', '60+']
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

  const data = useSelector(state => state.streamingData);

  useEffect(() => {
    setAgeData(parseAgeData(data))
  }, [data]);

  return (
    <div id="chart">
      <ReactApexChart 
        options={options} 
        series={[{data:ageData}]} 
        type="bar" 
        // height='200'
      />
  </div>
  )
}
