import './App.css';
import DataDashboard from './components/DataDashboard';
import NavBar from './components/NavBar';

function App() {
  // const [genderData, setGenderData] = useState([105, 121])
  
  // function updateGenderStatus () {
  //   let  [men, woman] = genderData;
  //   men += Math.round(Math.random())
  //   woman += Math.round(Math.random())
  
  //   setGenderData([men, woman])
  
  //   console.log(genderData);
  // }
  // updateGenderStatus()
  // setTimeout(updateGenderStats, 1000)

  
  return (
    <div>
      <NavBar />
      <DataDashboard />
    </div>
  );
}

export default App;
