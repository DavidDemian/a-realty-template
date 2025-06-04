import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import ListingCard from './ListingCard';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { AnimatedElement } from '../utils/animations';

/**
 * ListingsGrid Component
 * A reusable, modular component for displaying a grid of property listings.
 * Designed to be IDX-ready with dynamic data handling.
 */
const ListingsGrid = ({
  listings = [],
  limit = 0,
  showHeading = true,
  showFilters = true,
  showViewAll = true,
  title = "Our Listings",
  subtitle = "Browse our selection of properties in South Florida. Find your dream home today.",
  className = '',
  ...props
}) => {
  const [filteredListings, setFilteredListings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filter options - can be customized based on your IDX data
  const filterOptions = ['All', 'For Sale', 'For Rent', 'Featured'];
  
  // Filter listings based on active filter
  useEffect(() => {
    let result = [...listings];
    
    if (activeFilter === 'For Sale') {
      result = result.filter(listing => listing.status === 'Active');
    } else if (activeFilter === 'For Rent') {
      result = result.filter(listing => listing.status === 'Rental');
    } else if (activeFilter === 'Featured') {
      result = result.filter(listing => listing.featured);
    }
    
    // Apply limit if specified
    if (limit > 0) {
      result = result.slice(0, limit);
    }
    
    setFilteredListings(result);
  }, [listings, activeFilter, limit]);
  
  return (
    <section className={`py-16 ${className}`} {...props}>
      <Container>
        {/* Section Heading */}
        {showHeading && (
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
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
        
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing, index) => (
            <ListingCard
              key={listing.listingId}
              listing={listing}
              index={index}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Icon name="home" size="2xl" className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">
              No properties match your current filter. Try changing your filter or check back later.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveFilter('All')}
            >
              View All Listings
            </Button>
          </div>
        )}
        
        {/* View All Button */}
        {showViewAll && filteredListings.length > 0 && (
          <AnimatedElement animation="fade-in" delay={600} duration={800}>
            <div className="text-center mt-12">
              <Button
                as="link"
                to="/properties"
                variant="outline"
                size="lg"
                className="min-w-[200px] justify-center"
              >
                View All Listings
              </Button>
            </div>
          </AnimatedElement>
        )}
      </Container>
    </section>
  );
};

ListingsGrid.propTypes = {
  listings: PropTypes.array,
  limit: PropTypes.number,
  showHeading: PropTypes.bool,
  showFilters: PropTypes.bool,
  showViewAll: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

export default ListingsGrid;
