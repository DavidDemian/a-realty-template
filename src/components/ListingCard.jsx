import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Icon from './ui/Icon';
import { AnimatedElement } from '../utils/animations';

/**
 * ListingCard Component
 * A reusable card component for displaying individual property listings.
 * Designed to work with IDX data structure.
 */
const ListingCard = ({
  listing,
  index = 0,
  className = '',
  ...props
}) => {
  // Extract data from the listing object
  const {
    listingId,
    address,
    price,
    bedrooms,
    bathrooms,
    squareFootage,
    photos,
    status,
    featured,
    propertyType
  } = listing;

  // Get the primary photo or use a placeholder
  const primaryPhoto = photos && photos.length > 0 
    ? photos[0].url 
    : 'https://via.placeholder.com/800x600?text=No+Image+Available';

  // Format price with commas
  const formattedPrice = price ? price.toLocaleString() : '0';

  // Determine if it's a rental property
  const isRental = status === 'Rental';

  // Calculate animation delay based on index
  const animationDelay = index * 100;

  // Map status to display text and color
  const getStatusDisplay = (status) => {
    switch(status) {
      case 'Active':
        return { text: 'For Sale', color: 'text-green-600' };
      case 'Rental':
        return { text: 'For Rent', color: 'text-blue-600' };
      case 'Pending':
        return { text: 'Pending', color: 'text-orange-600' };
      case 'Sold':
        return { text: 'Sold', color: 'text-red-600' };
      default:
        return { text: status, color: 'text-gray-600' };
    }
  };

  const statusDisplay = getStatusDisplay(status);

  return (
    <AnimatedElement
      animation="fade-in"
      delay={animationDelay}
      duration={500}
      className={className}
      {...props}
    >
      <Card
        className="group h-full transition-all duration-300 hover:shadow-xl"
        padding={false}
        hover={true}
      >
        {/* Property Image */}
        <div className="relative overflow-hidden h-64">
          <img
            src={primaryPhoto}
            alt={`${address?.fullAddress || 'Property'}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Status Badge */}
          {status && (
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              <span className={statusDisplay.color}>{statusDisplay.text}</span>
            </div>
          )}
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4 bg-[#f0c040] text-[#0a2342] px-3 py-1 rounded-full text-sm font-medium shadow-md">
              Featured
            </div>
          )}
          
          {/* Price */}
          <div className="absolute bottom-4 left-4 bg-[#0a2342] text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
            ${formattedPrice}
            {isRental && <span className="text-sm font-normal">/mo</span>}
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-[#0a2342] transition-colors duration-300">
            {propertyType || 'Property'}
          </h3>
          
          <p className="text-gray-600 mb-4 flex items-center">
            <Icon name="location" size="sm" className="mr-1 text-gray-400" />
            <span className="line-clamp-1">{address?.fullAddress || 'Address not available'}</span>
          </p>
          
          {/* Property Features */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <div className="flex items-center">
              <Icon name="bed" className="text-gray-400 mr-1" />
              <span className="text-gray-700">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            
            <div className="flex items-center">
              <Icon name="bath" className="text-gray-400 mr-1" />
              <span className="text-gray-700">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            
            <div className="flex items-center">
              <Icon name="area" className="text-gray-400 mr-1" />
              <span className="text-gray-700">{squareFootage} sq ft</span>
            </div>
          </div>
          
          {/* MLS ID */}
          <div className="mt-3 text-sm text-gray-500">
            MLS# {listingId}
          </div>
          
          {/* View Details Link */}
          <Link
            to={`/properties/${listingId}`}
            className="mt-4 inline-block w-full text-center py-3 bg-white border border-[#0a2342] text-[#0a2342] rounded-md font-medium transition-all duration-300 hover:bg-[#0a2342] hover:text-white transform hover:-translate-y-1 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </Card>
    </AnimatedElement>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    listingId: PropTypes.string.isRequired,
    address: PropTypes.shape({
      fullAddress: PropTypes.string,
      streetNumber: PropTypes.string,
      streetName: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipCode: PropTypes.string
    }),
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    squareFootage: PropTypes.number.isRequired,
    propertyType: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        caption: PropTypes.string
      })
    ),
    status: PropTypes.string,
    featured: PropTypes.bool
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string
};

export default ListingCard;
