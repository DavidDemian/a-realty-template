import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel';
import InfoCard from '../components/InfoCard';
import RealtorCard from '../components/RealtorCard';
import { useProperties } from '../context/PropertyContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [tab, setTab] = useState('photos');
  const { getProperty } = useProperties();

  useEffect(() => {
    const foundProperty = getProperty(parseInt(id));
    setProperty(foundProperty);
  }, [id, getProperty]);

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

  const generateImages = (baseImage) => {
    if (!baseImage) return [];
    return [
      baseImage,
      baseImage.replace('random=1', 'random=10'),
      baseImage.replace('random=1', 'random=20'),
      baseImage.replace('random=1', 'random=30'),
    ];
  };

  const enhancedProperty = {
    ...property,
    bedrooms: property.bedrooms || '3',
    bathrooms: property.bathrooms || '2',
    squareFeet: property.squareFeet || '1,800',
    garage: property.garage || '2 Cars',
    type: property.type || 'Single Family',
    yearBuilt: property.yearBuilt || '2015',
    images: property.images && property.images.length > 0 ? property.images : generateImages(property.image),
    tour360: property.tour360 || "https://www.google.com/maps/embed?pb=!4v1717631773787!6m8!1m7!1sCAoSLEFGMVFpcE9fUHZQbXJwUDRJWFhfbXNJWnhHVnJpVnFxTDFVNWxVQnRXTFE3!2m2!1d25.7616798!2d-80.1917902!3f30!4f0!5f0.7820865974627469",
  };

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
        <p className="text-green-600 font-bold text-2xl mt-2">{property?.price}</p>
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

        {/* Realtor Info */}
        <div>
          <RealtorCard />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
