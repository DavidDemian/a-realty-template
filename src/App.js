import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetails from './pages/PropertyDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PropertyForm from './pages/PropertyForm';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { ListingsProvider } from './context/ListingsContext';

// Config
import { seo } from './config/siteConfig';

/**
 * App Component
 * The main application component that sets up routing and global providers.
 */
function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <ListingsProvider>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
        </Helmet>
        
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/property/new" element={<PropertyForm />} />
              <Route path="/admin/property/:id" element={<PropertyForm />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
        </ListingsProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
