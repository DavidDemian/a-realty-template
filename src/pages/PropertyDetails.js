import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel';
import InfoCard from '../components/InfoCard';
import RealtorCard from '../components/RealtorCard';
import MortgageCalculator from '../components/MortgageCalculator';
import { useListings } from '../context/ListingsContext';
import { useProperties } from '../context/PropertyContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [tab, setTab] = useState('photos');
  const navigate = useNavigate();
  
  // We'll use both contexts during the transition period
  const { getProperty } = useProperties();
  const { getListingById, loading } = useListings();

  useEffect(() => {
    // First try to get the property from the new ListingsContext
    const foundListing = getListingById(id);
    
    if (foundListing) {
      // Transform the listing data to match the expected property structure
      const transformedProperty = {
        id: foundListing.listingId,
        title: foundListing.propertyType || 'Property',
        price: foundListing.price,
        address: foundListing.address?.fullAddress || '',
        bedrooms: foundListing.bedrooms,
        bathrooms: foundListing.bathrooms,
        area: foundListing.squareFootage,
        description: foundListing.description,
        status: foundListing.status === 'Active' ? 'For Sale' : 
                foundListing.status === 'Rental' ? 'For Rent' : foundListing.status,
        featured: foundListing.featured,
        // Transform photos array to a single image for backward compatibility
        image: foundListing.photos && foundListing.photos.length > 0 ? 
               foundListing.photos[0].url : null,
        // Keep the full photos array for the new component
        images: foundListing.photos ? foundListing.photos.map(photo => photo.url) : [],
        // Additional IDX data
        yearBuilt: foundListing.yearBuilt,
        propertyType: foundListing.propertyType,
        listingId: foundListing.listingId,
        daysOnMarket: foundListing.daysOnMarket,
        listingAgent: foundListing.listingAgent
      };
      
      setProperty(transformedProperty);
    } else if (!loading) {
      // If not found in ListingsContext and not still loading, try the old PropertyContext
      const oldProperty = getProperty(parseInt(id));
      
      if (oldProperty) {
        setProperty(oldProperty);
      } else {
        // If not found in either context, property doesn't exist
        console.log('Property not found');
      }
    }
  }, [id, getListingById, getProperty, loading]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property not found</h2>
          <Link to="/properties" className="text-green-600 hover:text-green-800 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#0a2463"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-100 rounded-lg w-full max-w-2xl mx-auto"></div>
        </div>
      </div>
    );
  }

  const generateImages = (baseImage) => {
    if (!baseImage) return [];
    return [
      baseImage,
      baseImage.replace('random=1', 'random=10'),
      baseImage.replace('random=1', 'random=20'),
      baseImage.replace('random=1', 'random=30'),
    ];
  };

  const enhancedProperty = property ? {
    ...property,
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    squareFeet: property.area || property.squareFootage || 1800,
    garage: property.garage || '2 Cars',
    type: property.propertyType || property.type || 'Single Family',
    yearBuilt: property.yearBuilt || 2015,
    images: property.images && property.images.length > 0 ? property.images : generateImages(property.image),
    tour360: property.tour360 || "https://www.google.com/maps/embed?pb=!4v1717631773787!6m8!1m7!1sCAoSLEFGMVFpcE9fUHZQbXJwUDRJWFhfbXNJWnhHVnJpVnFxTDFVNWxVQnRXTFE3!2m2!1d25.7616798!2d-80.1917902!3f30!4f0!5f0.7820865974627469",
    // Add MLS ID for IDX data
    mlsId: property.listingId || `MLS-${property.id}`
  } : null;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Link to="/" className="text-green-600 hover:text-green-800 mb-6 inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#0a2463"
          className="w-5 h-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{property?.title}</h1>
        <p className="text-gray-600">{property?.address}</p>
        <p className="text-green-600 font-bold text-2xl mt-2">
          ${property?.price?.toLocaleString()}
          {property?.status === 'For Rent' && <span className="text-sm font-normal">/mo</span>}
        </p>
        {/* Display MLS ID for IDX data */}
        {enhancedProperty?.mlsId && (
          <p className="text-gray-500 text-sm mt-1">MLS# {enhancedProperty.mlsId}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Centered Tabs */}
          <div className="flex justify-center space-x-4 mb-4 border-b pb-2">
            <button
              className={`font-semibold ${tab === 'photos' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setTab('photos')}
            >
              Photos
            </button>
            <button
              className={`font-semibold ${tab === '360' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setTab('360')}
            >
              360 Tour
            </button>
          </div>

          {/* Carousel or 360 View */}
          <div className="mb-8">
            {tab === 'photos' ? (
              <PhotoCarousel images={enhancedProperty?.images || [property?.image]} />
            ) : (
              <div className="w-full h-[400px]">
                {enhancedProperty.tour360 ? (
                  <iframe
                    src={enhancedProperty.tour360}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg shadow-md"
                    title="360 Tour"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">No virtual tour available for this property</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Card with Google Maps */}
          <InfoCard property={enhancedProperty}>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="relative w-full h-[300px] rounded-md overflow-hidden shadow-md">
                <iframe
                  title="Property Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(property.address)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Realtor Info and Mortgage Calculator */}
        <div className="space-y-6">
          <RealtorCard />
          <MortgageCalculator 
            showTotalInterest={true}
            animateResult={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
