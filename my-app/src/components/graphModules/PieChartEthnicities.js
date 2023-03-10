import React, { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { parseEthnicityData } from '../../data-service';

export default function PieChartEthnicities({data}) {
  const [ethnicityData, setEthnicityData] = useState([0,0,0,0,0])
  
  useEffect(() => {
    setEthnicityData(parseEthnicityData(data))
  }, [data])
  
  const options = { 
    title: {text: 'Detections by Ethnicity'},
    labels: ["White", "Black", "Asian", "Middle-Eastern", "Latin American"],
    plotOptions : {
      pie: {
        size: 200,
        donut: {
          size: '0%'
        }
      }
    }
  };
  
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <ApexChart
            options={options}
            series={ethnicityData}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}
