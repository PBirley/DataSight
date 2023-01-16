import React, { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { parseGenderData } from '../../data-service';

export default function PieChartGenders() {
  const [genderData, setGenderData] = useState([0,0])
  
  const data = useSelector(state => state.streamingData)
  
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
            // width={372}
          />
        </div>
      </div>
    </div>
  );
}
