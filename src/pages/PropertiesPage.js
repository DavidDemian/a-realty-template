import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

// Components
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Properties from '../components/Properties';
import { AnimatedElement } from '../utils/animations';

// Context
import { PropertyContext } from '../context/PropertyContext';

// Config
import { brand } from '../config/siteConfig';

/**
 * PropertiesPage Component
 * A page that displays all properties with filtering options.
 */
const PropertiesPage = () => {
  const { properties } = useContext(PropertyContext);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();
  
  // Get filter from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    
    if (filter) {
      let filtered = [...properties];
      
      if (filter === 'sale') {
        filtered = filtered.filter(property => property.status === 'For Sale');
      } else if (filter === 'rent') {
        filtered = filtered.filter(property => property.status === 'For Rent');
      } else if (filter === 'featured') {
        filtered = filtered.filter(property => property.featured);
      } else if (filter === 'new') {
        // Assuming properties have a 'createdAt' field
        // Sort by date and get the newest ones (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        filtered = filtered.filter(property => {
          if (property.createdAt) {
            const createdDate = new Date(property.createdAt);
            return createdDate >= thirtyDaysAgo;
          }
          return false;
        });
      }
      
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  }, [location.search, properties]);
  
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
      
      {/* Properties Section */}
      <section className="py-16">
        <Container>
          <Properties
            properties={filteredProperties}
            limit={0} // No limit, show all properties
            showHeading={false}
            showFilters={true}
            showViewAll={false}
          />
        </Container>
      </section>
    </>
  );
};

export default PropertiesPage;
