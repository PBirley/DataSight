import React from 'react'
import styles from './DataDashboard.module.css'
import PieChartGenders from './graphModules/PieChartGenders'
import PieChartEthnicities from './graphModules/PieChartEthnicities';
import BarChartAges from './graphModules/BarChartAges';
import LineGraphPeoplePerPeroid from './graphModules/LineGraphPeoplePerPeroid';

export default function DataDashboard() {
  return (
    <div>
      <div className={styles.chartElement}>
        <LineGraphPeoplePerPeroid />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.chartElement}>
          <PieChartGenders />
        </div>
        <div className={styles.chartElement}>
          <BarChartAges />
        </div>
        <div className={styles.chartElement}>
          <PieChartEthnicities />
        </div>
      </div>
    </div>
  )
}
