import { useState } from 'react';
import './App.css';
import PeopleGraph from './components/PeopleGraph';
import PieChart from './components/PieChart';
import ZoomableTimeSeries from './components/ZoomableTimeSeries';
import logo from './images/logo.svg';

function App() {
  const [genderData, setGenderData] = useState([105, 121])
  
  function updateGenderStatus () {
    let  [men, woman] = genderData;
    men += Math.round(Math.random())
    woman += Math.round(Math.random())
  
    setGenderData([men, woman])
  
    console.log(genderData);
  }
  // updateGenderStatus()
  // setTimeout(updateGenderStats, 1000)

  
  return (
    <div>
      <img src={logo} alt=''/>
      <ZoomableTimeSeries />
      {/* <PeopleGraph /> */}
      <PieChart genderData={genderData} />
    </div>
  );
}

export default App;
