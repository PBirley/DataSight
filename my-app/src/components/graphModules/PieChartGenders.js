import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { parseGenderData } from '../../data-service';

export default function PieChartGenders() {
  const [genderData, setGenderData] = useState([0,0])
  const options = { labels: ["Men", "Women"] };

  const data = useSelector(state => state.streamingData)

  useEffect(() => {
    setGenderData(parseGenderData(data))
  }, [data])


  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={genderData}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}
