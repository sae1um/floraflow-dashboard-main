import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/shared/layout';
import Settings from './components/settings';
import Documentation from './components/documentation';
import HealthMonitor from './components/health';
import UptimeMonitor from './components/uptime';
import LightControl from './components/lightcontrol';
import TempControl from './components/tempcontrol';
import SensorControl from './components/sensorcontrol';
// import DashBoard from './components/dashboard';
import DashBoard from './components/dashboard-entry';
import LandingPage from './pages/Landing';
import RegisterPage from "./pages/auth/Register"
import LoginPage from './pages/auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<LandingPage />} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Layout/>}>
          <Route index element={<DashBoard />}/>
          <Route path="health" element={<HealthMonitor />}/>
          <Route path="uptime" element={<UptimeMonitor/>}/>
          <Route path="lightcontrols" element={<LightControl/>}/>
          <Route path="temperatures" element={<TempControl/>}/>
          <Route path="sensorcontrol" element={<SensorControl/>}/>
          <Route path="settings" element={<Settings />}/> 
          <Route path="support" element={<Documentation />}/> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
