import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Income from './pages/Income';
import Expense from './pages/Expense';
import PlantingTips from './pages/PlantingTips';
import IrrigationTips from './pages/IrrigationTips';
import CropCalendar from './pages/CropCalendar';
import PestControl from './pages/PestControl';
import { LanguageProvider } from './context/LanguageContext';
import { AccountabilityProvider } from './context/AccountabilityContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideNavigation = ['/login', '/signup'].includes(location.pathname) || !isAuthenticated;

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans ${!hideNavigation ? 'pb-24 sm:pb-0 sm:pl-24 lg:pl-0' : ''}`}>
      {!hideNavigation && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home onOpenSidebar={() => setIsSidebarOpen(true)} /></ProtectedRoute>} />
        <Route path="/crop-doctor" element={<ProtectedRoute><CropDoctor /></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
        <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
        <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        <Route path="/planting-tips" element={<ProtectedRoute><PlantingTips /></ProtectedRoute>} />
        <Route path="/irrigation-tips" element={<ProtectedRoute><IrrigationTips /></ProtectedRoute>} />
        <Route path="/crop-calendar" element={<ProtectedRoute><CropCalendar /></ProtectedRoute>} />
        <Route path="/pest-control" element={<ProtectedRoute><PestControl /></ProtectedRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
        <Route path="/resetpassword/:token" element={<AuthRoute><ResetPassword /></AuthRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
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
      <AuthProvider>
        <AccountabilityProvider>
          <Router>
            <AppContent />
          </Router>
        </AccountabilityProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}


export default App;
