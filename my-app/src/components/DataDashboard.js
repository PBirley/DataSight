import React, { useEffect } from 'react'
import styles from './DataDashboard.module.css'
import { streamData } from '../api-service'
import { useDispatch } from "react-redux";
import PieChartGenders from './graphModules/PieChartGenders'
import PieChartEthnicities from './graphModules/PieChartEthnicities';
import BarChartAges from './graphModules/BarChartAges';
import LineGraphPeoplePerPeroid from './graphModules/LineGraphPeoplePerPeroid';

export default function DataDashboard() {
  const dispatch = useDispatch();

  //On page render begin streaming the data
  useEffect(() => {
    streamData(dispatch);
  },[dispatch])

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
        {/* <div className={styles.chartElement}>
          <button>ADD</button>
        </div> */}
      </div>
    </div>
  )
}
