import React, { useEffect } from 'react'
import ZoomableTimeSeries from './graphModules/ZoomableTimeSeries'
import styles from './DataDashboard.module.css'
import { streamData } from '../api-service'
import { useDispatch } from "react-redux";
import PieChartGenders from './graphModules/PieChartGenders'

export default function DataDashboard() {
  const dispatch = useDispatch();

  //On page render begin streaming the data
  useEffect(() => {
    streamData(dispatch);
  },[dispatch])

  return (
    <div>
      <div className={styles.chartElement}>
        <ZoomableTimeSeries />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.chartElement}>
          <PieChartGenders />
        </div>
        <div className={styles.chartElement}>
          <button>ADD</button>
        </div>
      </div>
    </div>
  )
}
