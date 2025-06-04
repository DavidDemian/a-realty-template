import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import PropertyCard from './PropertyCard';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { propertiesSection } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';

/**
 * Properties Component
 * Displays a grid of property cards with filtering options.
 */
const Properties = ({
  properties = [],
  limit = 6,
  showHeading = true,
  showFilters = true,
  showViewAll = true,
  className = '',
  ...props
}) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filter options
  const filterOptions = ['All', 'For Sale', 'For Rent', 'Featured'];
  
  // Filter properties based on active filter
  useEffect(() => {
    let result = [...properties];
    
    if (activeFilter === 'For Sale') {
      result = result.filter(property => property.status === 'For Sale');
    } else if (activeFilter === 'For Rent') {
      result = result.filter(property => property.status === 'For Rent');
    } else if (activeFilter === 'Featured') {
      result = result.filter(property => property.featured);
    }
    
    // Apply limit if specified
    if (limit > 0) {
      result = result.slice(0, limit);
    }
    
    setFilteredProperties(result);
  }, [properties, activeFilter, limit]);
  
  return (
    <section className={`py-16 ${className}`} {...props}>
      <Container>
        {/* Section Heading */}
        {showHeading && (
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title={propertiesSection.heading}
              subtitle={propertiesSection.description}
            />
          </AnimatedElement>
        )}
        
        {/* Filters */}
        {showFilters && (
          <AnimatedElement animation="slide-up" delay={300} duration={800}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeFilter === filter
                      ? 'bg-[#0a2463] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </AnimatedElement>
        )}
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Icon name="home" size="2xl" className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">
              No properties match your current filter. Try changing your filter or check back later.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveFilter('All')}
            >
              View All Properties
            </Button>
          </div>
        )}
        
        {/* View All Button */}
        {showViewAll && filteredProperties.length > 0 && (
          <AnimatedElement animation="fade-in" delay={600} duration={800}>
            <div className="text-center mt-12">
              <Button
                as="link"
                to="/properties"
                variant="outline"
                size="lg"
                className="min-w-[200px] justify-center"
              >
                View All Properties
              </Button>
            </div>
          </AnimatedElement>
        )}
      </Container>
    </section>
  );
};

Properties.propTypes = {
  properties: PropTypes.array,
  limit: PropTypes.number,
  showHeading: PropTypes.bool,
  showFilters: PropTypes.bool,
  showViewAll: PropTypes.bool,
  className: PropTypes.string
};

export default Properties;
