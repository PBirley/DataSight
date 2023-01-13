import './App.css';
import DataDashboard from './components/DataDashboard';
import NavBar from './components/NavBar';
import VideoPlayer from './components/VideoPlayer';
import Webcam from './components/Webcam';

function App() {
  return (
    <div>
      {/* <WebsocketsStream /> */}
      <Webcam />
      {/* <NavBar />
      <VideoPlayer />
      <DataDashboard /> */}
    </div>
  );
}

export default App;
