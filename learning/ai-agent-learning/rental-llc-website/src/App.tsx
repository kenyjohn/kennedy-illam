import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AvailabilityManager from './pages/AvailabilityManager';

// Layout component for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes (no navbar/footer) */}
        <Route path="/admin/login" element={<AdminLoginNew />} />
        <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/showings" element={<AdminShowings />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/properties/:propertyId/availability" element={<AvailabilityManager />} />

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
