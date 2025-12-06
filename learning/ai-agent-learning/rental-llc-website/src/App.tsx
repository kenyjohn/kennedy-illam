import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import AdminLoginNew from './pages/AdminLoginNew';
import AdminDashboardNew from './pages/AdminDashboardNew';
import AdminProperties from './pages/AdminProperties';
import ApplicationForm from './pages/ApplicationForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FairHousing from './pages/FairHousing';
import AdminShowings from './pages/AdminShowings';
import AdminApplications from './pages/AdminApplications';
import AdminMaintenance from './pages/AdminMaintenance';
import AvailabilityManager from './pages/AvailabilityManager';

import TenantLogin from './pages/TenantLogin';
import TenantLayout from './components/tenant/TenantLayout';
import TenantDashboard from './pages/TenantDashboard';
import TenantMaintenance from './pages/TenantMaintenance';
import TenantDocuments from './pages/TenantDocuments';
import AdminDocuments from './pages/AdminDocuments';
import AdminLayout from './components/admin/AdminLayout';

// Layout component for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const ProtectedTenantRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('tenantToken');
  if (!token) {
    return <Navigate to="/tenant/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginNew />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardNew />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="showings" element={<AdminShowings />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="maintenance" element={<AdminMaintenance />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="properties/:propertyId/availability" element={<AvailabilityManager />} />
        </Route>

        {/* Tenant routes */}
        <Route path="/tenant/login" element={<TenantLogin />} />
        <Route path="/tenant" element={
          <ProtectedTenantRoute>
            <TenantLayout />
          </ProtectedTenantRoute>
        }>
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="payments" element={<div>Payments Placeholder</div>} />
          <Route path="maintenance" element={<TenantMaintenance />} />
          <Route path="documents" element={<TenantDocuments />} />
          <Route path="messages" element={<div>Messages Placeholder</div>} />
        </Route>

        {/* Public routes (with navbar/footer) */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
        <Route path="/properties/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
        <Route path="/properties/:id/apply" element={<PublicLayout><ApplicationForm /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
        <Route path="/fair-housing" element={<PublicLayout><FairHousing /></PublicLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
