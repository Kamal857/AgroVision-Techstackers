import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MyJobs from './pages/MyJobs';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import CropDoctor from './pages/CropDoctor';
import Market from './pages/Market';
import { LanguageProvider } from './context/LanguageContext';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log("App Mounted Successfully");
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      console.error("GLOBAL ERROR DETECTED:", msg, error);
      return false;
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 sm:pb-0 sm:pl-24 lg:pl-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crop-doctor" element={<CropDoctor />} />
            <Route path="/market" element={<Market />} />
            <Route path="/jobs" element={<MyJobs />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
