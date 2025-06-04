import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

// Components
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ListingsGrid from '../components/ListingsGrid';
import { AnimatedElement } from '../utils/animations';

// Context
import { useListings } from '../context/ListingsContext';

// Config
import { brand } from '../config/siteConfig';

/**
 * PropertiesPage Component
 * A page that displays all property listings with filtering options.
 * Uses the IDX-ready ListingsGrid component with the ListingsContext.
 */
const PropertiesPage = () => {
  const { listings, loading, error, filterListings } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);
  const location = useLocation();
  
  // Get filter from URL query parameters
  useEffect(() => {
    if (loading) return;
    
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    
    if (filter) {
      let filters = {};
      
      if (filter === 'sale') {
        filters.status = 'Active'; // 'Active' status maps to 'For Sale' in our UI
      } else if (filter === 'rent') {
        filters.status = 'Rental'; // 'Rental' status maps to 'For Rent' in our UI
      } else if (filter === 'featured') {
        filters.featured = true;
      } else if (filter === 'new') {
        // This would be implemented with a date filter when using real IDX data
        // For now, we'll just show all listings as we don't have date fields in our mock data
      }
      
      setFilteredListings(filterListings(filters));
    } else {
      setFilteredListings(listings);
    }
  }, [location.search, listings, loading, filterListings]);
  
  return (
    <>
      <Helmet>
        <title>Properties | {brand.name}</title>
        <meta name="description" content={`Browse our selection of luxury properties in South Florida. Find your dream home with ${brand.name}.`} />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-gray-900 text-white pt-32 pb-16">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title="Our Properties"
              subtitle="Browse our selection of luxury properties in South Florida. Find your dream home today."
              align="center"
              titleClassName="text-white"
              subtitleClassName="text-gray-300"
            />
          </AnimatedElement>
        </Container>
      </div>
      
      {/* Listings Section */}
      <section className="py-16">
        <Container>
          {loading ? (
            <div className="text-center py-12">
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
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Listings</h3>
              <p className="text-gray-500 mb-6">{error}</p>
            </div>
          ) : (
            <ListingsGrid
              listings={filteredListings}
              limit={0} // No limit, show all listings
              showHeading={false}
              showFilters={true}
              showViewAll={false}
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default PropertiesPage;
