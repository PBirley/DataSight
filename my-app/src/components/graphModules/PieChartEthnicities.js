import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { parseEthnicityData } from '../../data-service';

export default function PieChartGenders() {
  const [ethnicityData, setEthnicityData] = useState([0,0,0,0,0])
  const options = { labels: ["White", "Black", "Asian", "Middle-Eastern", "Latin American"] };

  const data = useSelector(state => state.streamingData)

  useEffect(() => {
    setEthnicityData(parseEthnicityData(data))
  }, [data])


  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={ethnicityData.map((data) => data)}
            type="donut"
            width="300"
          />
        </div>
      </div>
    </div>
  );
}
