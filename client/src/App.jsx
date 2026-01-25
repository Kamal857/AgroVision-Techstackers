import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MyJobs from './pages/MyJobs';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import CropDoctor from './pages/CropDoctor';
import Market from './pages/Market';
import CalculatorPage from './pages/Calculator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Expense from './pages/Expense';
import PlantingTips from './pages/PlantingTips';
import IrrigationTips from './pages/IrrigationTips';
import CropCalendar from './pages/CropCalendar';
import PestControl from './pages/PestControl';
import { LanguageProvider } from './context/LanguageContext';
import { AccountabilityProvider } from './context/AccountabilityContext';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const hideNavigation = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans ${!hideNavigation ? 'pb-24 sm:pb-0 sm:pl-24 lg:pl-0' : ''}`}>
      {!hideNavigation && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      <Routes>
        <Route path="/" element={<Home onOpenSidebar={() => setIsSidebarOpen(true)} />} />
        <Route path="/crop-doctor" element={<CropDoctor />} />
        <Route path="/market" element={<Market />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/planting-tips" element={<PlantingTips />} />
        <Route path="/irrigation-tips" element={<IrrigationTips />} />
        <Route path="/crop-calendar" element={<CropCalendar />} />
        <Route path="/pest-control" element={<PestControl />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<MyJobs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!hideNavigation && <BottomNav />}
    </div>
  );
};

function App() {
  useEffect(() => {
    console.log("App Mounted Successfully");
  }, []);

  return (
    <LanguageProvider>
      <AccountabilityProvider>
        <Router>
          <AppContent />
        </Router>
      </AccountabilityProvider>
    </LanguageProvider>
  );
}

export default App;
