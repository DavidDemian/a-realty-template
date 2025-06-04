import React, { createContext, useState, useContext, useEffect } from 'react';
import initialProperties from '../Data/propertiesData';

// Create the context
export const PropertyContext = createContext();

// Custom hook to use the context
export const useProperties = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load properties from localStorage or use initial data
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(initialProperties);
    }
    setLoading(false);
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('properties', JSON.stringify(properties));
    }
  }, [properties, loading]);

  // Add a new property
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
    };
    setProperties([...properties, newProperty]);
    return newProperty;
  };

  // Update an existing property
  const updateProperty = (updatedProperty) => {
    setProperties(
      properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
    return updatedProperty;
  };

  // Delete a property
  const deleteProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  // Get a property by ID
  const getProperty = (id) => {
    return properties.find((property) => property.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        addProperty,
        updateProperty,
        deleteProperty,
        getProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
