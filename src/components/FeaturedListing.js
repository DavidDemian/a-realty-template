import React from 'react';
import PropTypes from 'prop-types';
import Card from './ui/Card';
import Button from './ui/Button';
import { featuredListing } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';

/**
 * FeaturedListing Component
 * Displays the featured property of the month
 */
const FeaturedListing = ({ className = '', ...props }) => {
  const { property } = featuredListing;

  return (
    <AnimatedElement animation="slide-left" duration={800} delay={300}>
      <Card
        className={`overflow-hidden ${className}`}
        shadow="lg"
        borderTop={true}
        borderColor="#0a2342"
        {...props}
      >
        <div className="relative">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="bg-[#f0c040] text-[#0a2342] font-bold px-4 py-1 rounded-full text-sm">
              {featuredListing.title}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{property.name}</h3>
            <p className="text-sm">{property.address}</p>
            <p className="text-xl font-bold mt-2 text-[#f0c040]">{property.price}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a2342] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-700">{property.beds} Beds</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a2342] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">{property.baths} Baths</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a2342] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span className="text-gray-700">{property.sqft.toLocaleString()} Sq Ft</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{property.description}</p>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">Key Features</h4>
            <ul className="space-y-2">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a2342] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Button
              as="link"
              to={`/properties/featured`}
              variant="primary"
              className="w-full justify-center"
            >
              View Listing
            </Button>
          </div>
        </div>
      </Card>
    </AnimatedElement>
  );
};

FeaturedListing.propTypes = {
  className: PropTypes.string
};

export default FeaturedListing;
