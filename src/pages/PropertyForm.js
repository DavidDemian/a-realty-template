import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

const PropertyForm = () => {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const navigate = useNavigate();
  const { addProperty, updateProperty, getProperty } = useProperties();

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    description: '',
    image: '',
    images: [],
    tour360: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    garage: '',
    type: '',
    yearBuilt: '',
  });

  const [additionalImages, setAdditionalImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      // Try both string and number ID to ensure compatibility
      const propertyId = parseInt(id);
      const property = getProperty(propertyId) || getProperty(id);
      
      if (property) {
        // Format price as string with $ if it's a number
        const formattedPrice = typeof property.price === 'number' 
          ? `$${property.price.toLocaleString()}` 
          : property.price;
        
        setFormData({
          ...property,
          // If these properties don't exist in the data, provide defaults
          price: formattedPrice,
          bedrooms: property.bedrooms || '',
          bathrooms: property.bathrooms || '',
          squareFeet: property.area || property.squareFeet || '',
          garage: property.garage || '',
          type: property.type || '',
          yearBuilt: property.yearBuilt || '',
          tour360: property.tour360 || '',
          images: property.images || [],
        });
        setMainImagePreview(property.image);
        setAdditionalImagePreviews(property.images || []);
      } else {
        console.error(`Property with ID ${id} not found`);
      }
    }
  }, [id, isEditing, getProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for price field to ensure proper formatting
    if (name === 'price') {
      // Remove any non-numeric characters except for the decimal point
      const numericValue = value.replace(/[^0-9.]/g, '');
      
      // Format as currency if there's a value
      const formattedValue = numericValue ? `$${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '';
      
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      const newPreviews = [];
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          newPreviews.push(reader.result);
          
          if (newImages.length === files.length) {
            setAdditionalImages([...additionalImages, ...newImages]);
            setAdditionalImagePreviews([...additionalImagePreviews, ...newPreviews]);
            setFormData({
              ...formData,
              images: [...(formData.images || []), ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = [...additionalImagePreviews];
    updatedImages.splice(index, 1);
    setAdditionalImagePreviews(updatedImages);
    
    const updatedFormImages = [...formData.images];
    updatedFormImages.splice(index, 1);
    setFormData({ ...formData, images: updatedFormImages });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image && !mainImagePreview) newErrors.image = 'Main image is required';
    
    // Format validation
    if (formData.bedrooms && !/^\d+$/.test(formData.bedrooms.trim())) {
      newErrors.bedrooms = 'Bedrooms must be a number';
    }
    
    if (formData.bathrooms && !/^\d+(\.\d+)?$/.test(formData.bathrooms.trim())) {
      newErrors.bathrooms = 'Bathrooms must be a number';
    }
    
    if (formData.squareFeet && !/^\d+$/.test(formData.squareFeet.replace(/,/g, '').trim())) {
      newErrors.squareFeet = 'Square feet must be a number';
    }
    
    if (formData.yearBuilt && !/^\d{4}$/.test(formData.yearBuilt.trim())) {
      newErrors.yearBuilt = 'Year built must be a 4-digit year';
    }
    
    if (formData.tour360 && !formData.tour360.trim().startsWith('http')) {
      newErrors.tour360 = 'Virtual tour URL must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const propertyData = {
      ...formData,
      id: isEditing ? parseInt(id) : undefined,
    };
    
    if (isEditing) {
      updateProperty(propertyData);
    } else {
      addProperty(propertyData);
    }
    
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? 'Edit Property' : 'Add New Property'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                  errors.title ? 'border-red-500' : ''
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$450,000"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                  errors.price ? 'border-red-500' : ''
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                  errors.description ? 'border-red-500' : ''
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="text"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="text"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Square Feet
                </label>
                <input
                  type="text"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Garage
                </label>
                <input
                  type="text"
                  name="garage"
                  value={formData.garage}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year Built
                </label>
                <input
                  type="text"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                360° Virtual Tour URL
              </label>
              <input
                type="text"
                name="tour360"
                value={formData.tour360}
                onChange={handleChange}
                placeholder="https://example.com/virtual-tour"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Image Upload Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Property Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex-shrink-0">
                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Property preview"
                    className="h-32 w-48 object-cover rounded-md"
                  />
                ) : (
                  <div className="h-32 w-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No image</span>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Upload Image
                </label>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Images
            </label>
            <div className="mt-1">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="hidden"
                id="additional-images-upload"
              />
              <label
                htmlFor="additional-images-upload"
                className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Upload Additional Images
              </label>
            </div>
            
            {additionalImagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {additionalImagePreviews.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Additional ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            {isEditing ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
