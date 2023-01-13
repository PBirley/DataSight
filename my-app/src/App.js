import './App.css';
import DataDashboard from './components/DataDashboard';
import NavBar from './components/NavBar';
import VideoPlayer from './components/VideoPlayer';
import Webcam2 from './components/Webcam2';

function App() {
  return (
    <div>
      {/* <WebsocketsStream /> */}
      <Webcam2 />
      {/* <NavBar />
      <VideoPlayer />
      <DataDashboard /> */}
    </div>
  );
}

export default App;
