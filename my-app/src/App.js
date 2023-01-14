import './App.css';
import NavBar from './components/NavBar';
import SplashScreen from './components/SplashScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from './components/DemoPage';
import BackendStreamPage from './components/BackendStreamPage';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<SplashScreen />}/>
          <Route path='/DEMO' element={<DemoPage />} />
          <Route path='/LIVE' element={<BackendStreamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
