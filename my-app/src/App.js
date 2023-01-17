import { useSelector } from 'react-redux';
import './App.css';
import Navigator from './components/Navigator';

function App() {
  const reports = useSelector(state => state.reportData);
  return (
    <div>
      <Navigator reports={reports}/>
    </div>
  );
}

export default App;
