import React from 'react'
import PieChart from './PieChart'
import ZoomableTimeSeries from './ZoomableTimeSeries'
import styles from './DataDashboard.module.css'

export default function DataDashboard() {
  return (
    <div>
      <div className={styles.chartElement}>
        <ZoomableTimeSeries />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.chartElement}>
          <PieChart genderData={[100,70]}/>
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
