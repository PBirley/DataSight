import './App.css';
import DataDashboard from './components/DataDashboard';
import NavBar from './components/NavBar';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div>
      <NavBar />
      <VideoPlayer />
      <DataDashboard />
    </div>
  );
}

export default App;
