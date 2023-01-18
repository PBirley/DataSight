import React, { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { parseGenderData } from '../../data-service';

export default function PieChartGenders({data}) {
  const [genderData, setGenderData] = useState([0,0])
  
  useEffect(() => {
    setGenderData(parseGenderData(data))
  }, [data])
  
  const options = { 
    title: {text: 'Detections by Gender'},
    labels: ["Men", "Women"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          }
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
            series={genderData}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}
