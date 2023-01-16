import './App.css';
import SplashScreen from './components/SplashScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DemoPage from './components/DemoPage';
import BackendStreamPage from './components/BackendStreamPage';
import Navigator from './components/Navigator';

function App() {
  return (
    <div>
      <Navigator />
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
