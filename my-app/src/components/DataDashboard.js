import React, { useEffect } from 'react'
import PieChart from './PieChart'
import ZoomableTimeSeries from './ZoomableTimeSeries'
import styles from './DataDashboard.module.css'
import { streamData } from '../api-service'
import { genderTotal } from '../data-service'

export default function DataDashboard() {

  useEffect(() => {
    streamData();
  },[])

  return (
    <div>
      <div className={styles.chartElement}>
        <ZoomableTimeSeries />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.chartElement}>
          <PieChart genderData={[genderTotal.menTotal, genderTotal.womanTotal]}/>
        </div>
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
