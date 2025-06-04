import React, { createContext, useState, useContext, useEffect } from 'react';
import mockListings from '../Data/mockListingsData';

/**
 * ListingsContext
 * A context provider for managing property listings data.
 * Currently uses mock data, but structured to easily switch to IDX API data.
 */

// Create the context
export const ListingsContext = createContext();

// Custom hook to use the context
export const useListings = () => useContext(ListingsContext);

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will be replaced with actual IDX API call in the future
    const fetchListings = async () => {
      try {
        // Simulate API call with mock data
        // In the future, this will be replaced with:
        // const response = await fetch('your-idx-api-endpoint');
        // const data = await response.json();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data for now
        setListings(mockListings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Function to filter listings by various criteria
  const filterListings = (filters = {}) => {
    let filteredResults = [...listings];
    
    // Filter by status (Active/For Sale, Rental/For Rent, etc.)
    if (filters.status) {
      filteredResults = filteredResults.filter(listing => listing.status === filters.status);
    }
    
    // Filter by featured
    if (filters.featured) {
      filteredResults = filteredResults.filter(listing => listing.featured);
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filteredResults = filteredResults.filter(listing => listing.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filteredResults = filteredResults.filter(listing => listing.price <= filters.maxPrice);
    }
    
    // Filter by bedrooms
    if (filters.minBedrooms) {
      filteredResults = filteredResults.filter(listing => listing.bedrooms >= filters.minBedrooms);
    }
    
    // Filter by bathrooms
    if (filters.minBathrooms) {
      filteredResults = filteredResults.filter(listing => listing.bathrooms >= filters.minBathrooms);
    }
    
    // Filter by square footage
    if (filters.minSquareFootage) {
      filteredResults = filteredResults.filter(listing => listing.squareFootage >= filters.minSquareFootage);
    }
    if (filters.maxSquareFootage) {
      filteredResults = filteredResults.filter(listing => listing.squareFootage <= filters.maxSquareFootage);
    }
    
    // Filter by property type
    if (filters.propertyType) {
      filteredResults = filteredResults.filter(listing => listing.propertyType === filters.propertyType);
    }
    
    return filteredResults;
  };

  // Get a listing by ID
  const getListingById = (id) => {
    return listings.find(listing => listing.listingId === id) || null;
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        loading,
        error,
        filterListings,
        getListingById,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
