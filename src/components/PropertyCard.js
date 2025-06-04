import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Icon from './ui/Icon';
import { AnimatedElement } from '../utils/animations';

/**
 * PropertyCard Component
 * A card displaying property information with hover effects and animations.
 */
const PropertyCard = ({
  property,
  index = 0,
  className = '',
  ...props
}) => {
  const {
    id,
    title,
    price,
    address,
    bedrooms,
    bathrooms,
    area,
    image,
    featured,
    status
  } = property;

  // Calculate animation delay based on index
  const animationDelay = index * 100;

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
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Status Badge */}
          {status && (
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {status === 'For Sale' ? (
                <span className="text-green-600">{status}</span>
              ) : status === 'For Rent' ? (
                <span className="text-blue-600">{status}</span>
              ) : (
                <span className="text-orange-600">{status}</span>
              )}
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
            ${price.toLocaleString()}
            {status === 'For Rent' && <span className="text-sm font-normal">/mo</span>}
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-[#0a2342] transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 flex items-center">
            <Icon name="location" size="sm" className="mr-1 text-gray-400" />
            <span className="line-clamp-1">{address}</span>
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
              <span className="text-gray-700">{area} sq ft</span>
            </div>
          </div>
          
          {/* View Details Link */}
          <Link
            to={`/properties/${id}`}
            className="mt-6 inline-block w-full text-center py-3 bg-white border border-[#0a2342] text-[#0a2342] rounded-md font-medium transition-all duration-300 hover:bg-[#0a2342] hover:text-white transform hover:-translate-y-1 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </Card>
    </AnimatedElement>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    status: PropTypes.string
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string
};

export default PropertyCard;
