import React, { useEffect } from 'react'
import PieChart from './PieChart'
import ZoomableTimeSeries from './ZoomableTimeSeries'
import styles from './DataDashboard.module.css'
import { streamData } from '../api-service'
import { useDispatch, useSelector } from "react-redux";

export default function DataDashboard() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.streamingData)

  useEffect(() => {
    console.log(data);
  }, [data])

  useEffect(() => {
    streamData(dispatch);
  },[])

  return (
    <div>
      <div className={styles.chartElement}>
        <ZoomableTimeSeries />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.chartElement}>
          <PieChart genderData={[100,200]}/>
        </div>
        <div className={styles.chartElement}>
          <PieChart genderData={[100,120]}/>
        </div>
        <div className={styles.chartElement}>
          <button>ADD</button>
        </div>
      </div>
    </div>
  )
}
