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

  // Update an existing property (handles both string and number IDs)
  const updateProperty = (updatedProperty) => {
    // Ensure the ID is a number for consistency
    const propertyId = typeof updatedProperty.id === 'string' 
      ? parseInt(updatedProperty.id, 10) 
      : updatedProperty.id;
    
    // Create a normalized property with numeric ID
    const normalizedProperty = {
      ...updatedProperty,
      id: propertyId
    };
    
    setProperties(
      properties.map((property) =>
        property.id === propertyId ? normalizedProperty : property
      )
    );
    
    return normalizedProperty;
  };

  // Delete a property (handles both string and number IDs)
  const deleteProperty = (id) => {
    // Try direct match first
    let found = properties.some(property => property.id === id);
    
    // If not found and id is a string, try numeric conversion
    if (!found && typeof id === 'string') {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        setProperties(properties.filter((property) => property.id !== numericId));
        return;
      }
    }
    
    // If not found and id is a number, try string conversion
    if (!found && typeof id === 'number') {
      const stringId = id.toString();
      if (properties.some(property => property.id.toString() === stringId)) {
        setProperties(properties.filter((property) => property.id.toString() !== stringId));
        return;
      }
    }
    
    // Default case - use original id
    setProperties(properties.filter((property) => property.id !== id));
  };

  // Get a property by ID (handles both string and number IDs)
  const getProperty = (id) => {
    // Try exact match first
    const exactMatch = properties.find((property) => property.id === id);
    if (exactMatch) return exactMatch;
    
    // If id is a string, try to find by parsed number
    if (typeof id === 'string') {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        return properties.find((property) => property.id === numericId);
      }
    }
    
    // If id is a number, try to find by string representation
    if (typeof id === 'number') {
      const stringId = id.toString();
      return properties.find((property) => property.id.toString() === stringId);
    }
    
    return null;
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
