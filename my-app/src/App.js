import './App.css';
import DataDashboard from './components/DataDashboard';
import NavBar from './components/NavBar';
import VideoPlayer from './components/VideoPlayer';
import Webcam from './components/Webcam';
import Webcam2 from './components/Webcam2';
import { WebsocketsStream } from './components/WebsocketsStream';

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
