import './App.css';
import NavBar from './components/NavBar';
import SplashScreen from './components/SplashScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DemoPage from './components/DemoPage';
import BackendStreamPage from './components/BackendStreamPage';
import ResponsiveDrawer from './components/PersistentDrawerLeft';
import DailyMotionPlayer from 'react-player/dailymotion';

function App() {
  return (
    <div>
      <ResponsiveDrawer/>
      {/* <DemoPage /> */}
      {/* <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<SplashScreen />}/>
          <Route path='/DEMO' element={<DemoPage />} />
          <Route path='/LIVE' element={<BackendStreamPage />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
