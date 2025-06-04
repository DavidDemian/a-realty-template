import React from 'react';
import { Helmet } from 'react-helmet';

// Components
import Hero from '../components/Hero';
import About from '../components/About';
import ListingsGrid from '../components/ListingsGrid';
import ContactForm from '../components/ContactForm';

// Context
import { useListings } from '../context/ListingsContext';

// Config
import { seo } from '../config/siteConfig';

/**
 * Home Page Component
 * The main landing page of the website.
 * Uses the IDX-ready ListingsGrid component.
 */
const Home = () => {
  const { listings, loading, error } = useListings();
  
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Listings Section */}
      {loading ? (
        <div className="py-16">
          <div className="container mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg h-96"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="py-16">
          <div className="container mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Listings</h3>
            <p className="text-gray-500 mb-6">{error}</p>
          </div>
        </div>
      ) : (
        <ListingsGrid
          listings={listings}
          limit={6}
          showHeading={true}
          showFilters={true}
          showViewAll={true}
          title="Featured Properties"
          subtitle="Explore our handpicked selection of premium properties. Find your perfect home today."
        />
      )}
      
      {/* Contact Section */}
      <ContactForm />
    </>
  );
};

export default Home;
