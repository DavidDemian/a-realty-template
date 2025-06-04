/**
 * Mock Listings Data
 * This file contains mock data that mimics the structure of IDX API data.
 * It will be replaced with real IDX API data once access is available.
 */

const mockListings = [
  {
    listingId: "MLS-12345",
    address: {
      streetNumber: "123",
      streetName: "Main St",
      city: "Tampa",
      state: "FL",
      zipCode: "33601",
      fullAddress: "123 Main St, Tampa, FL 33601"
    },
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2800,
    propertyType: "Single Family",
    yearBuilt: 2015,
    description: "Spacious 4 bed, 3 bath home with a pool and large backyard.",
    features: ["Pool", "Garage", "Fireplace"],
    status: "Active",
    daysOnMarket: 14,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=1",
        caption: "Front View"
      },
      {
        url: "https://picsum.photos/800/600?random=2",
        caption: "Living Room"
      }
    ],
    listingAgent: {
      name: "Jane Smith",
      phone: "813-555-1234",
      email: "jane@example.com"
    },
    featured: true
  },
  {
    listingId: "MLS-23456",
    address: {
      streetNumber: "456",
      streetName: "City Ave",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      fullAddress: "456 City Ave, Miami, FL 33101"
    },
    price: 350000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1500,
    propertyType: "Condo",
    yearBuilt: 2018,
    description: "Luxury 2 bed, 2 bath condo with skyline views and amenities.",
    features: ["Balcony", "Gym", "Pool"],
    status: "Active",
    daysOnMarket: 7,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=3",
        caption: "Building Exterior"
      },
      {
        url: "https://picsum.photos/800/600?random=4",
        caption: "Kitchen"
      }
    ],
    listingAgent: {
      name: "John Doe",
      phone: "305-555-6789",
      email: "john@example.com"
    },
    featured: false
  },
  {
    listingId: "MLS-34567",
    address: {
      streetNumber: "789",
      streetName: "Beach Dr",
      city: "St. Pete",
      state: "FL",
      zipCode: "33701",
      fullAddress: "789 Beach Dr, St. Pete, FL 33701"
    },
    price: 275000,
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 1200,
    propertyType: "Bungalow",
    yearBuilt: 1950,
    description: "Charming 2 bed, 1 bath just minutes from the beach.",
    features: ["Updated Kitchen", "Patio", "Hardwood Floors"],
    status: "Active",
    daysOnMarket: 21,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=5",
        caption: "Front View"
      },
      {
        url: "https://picsum.photos/800/600?random=6",
        caption: "Backyard"
      }
    ],
    listingAgent: {
      name: "Sarah Johnson",
      phone: "727-555-4321",
      email: "sarah@example.com"
    },
    featured: false
  },
  {
    listingId: "MLS-45678",
    address: {
      streetNumber: "22",
      streetName: "Oak Lane",
      city: "Ocala",
      state: "FL",
      zipCode: "34470",
      fullAddress: "22 Oak Lane, Ocala, FL 34470"
    },
    price: 620000,
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3500,
    propertyType: "Estate",
    yearBuilt: 2010,
    description: "Quiet country living with modern upgrades and acreage.",
    features: ["Acreage", "Pool", "Guest House"],
    status: "Active",
    daysOnMarket: 30,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=7",
        caption: "Aerial View"
      },
      {
        url: "https://picsum.photos/800/600?random=8",
        caption: "Pool Area"
      }
    ],
    listingAgent: {
      name: "Michael Brown",
      phone: "352-555-8765",
      email: "michael@example.com"
    },
    featured: true
  },
  {
    listingId: "MLS-56789",
    address: {
      streetNumber: "85",
      streetName: "Downtown Rd",
      city: "Orlando",
      state: "FL",
      zipCode: "32801",
      fullAddress: "85 Downtown Rd, Orlando, FL 32801"
    },
    price: 2500, // Monthly rent
    bedrooms: 2,
    bathrooms: 2.5,
    squareFootage: 1800,
    propertyType: "Townhouse",
    yearBuilt: 2020,
    description: "2 bed, 2.5 bath with open floor plan and rooftop patio.",
    features: ["Rooftop Patio", "Garage", "Smart Home"],
    status: "Rental",
    daysOnMarket: 5,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=9",
        caption: "Front View"
      },
      {
        url: "https://picsum.photos/800/600?random=10",
        caption: "Living Area"
      }
    ],
    listingAgent: {
      name: "Lisa Wilson",
      phone: "407-555-2345",
      email: "lisa@example.com"
    },
    featured: false
  },
  {
    listingId: "MLS-67890",
    address: {
      streetNumber: "16",
      streetName: "Ocean View",
      city: "Naples",
      state: "FL",
      zipCode: "34102",
      fullAddress: "16 Ocean View, Naples, FL 34102"
    },
    price: 1200000,
    bedrooms: 6,
    bathrooms: 5,
    squareFootage: 4200,
    propertyType: "Villa",
    yearBuilt: 2005,
    description: "Elegant villa with ocean views, spa, and private beach access.",
    features: ["Ocean View", "Private Beach Access", "Spa", "Wine Cellar"],
    status: "Active",
    daysOnMarket: 45,
    photos: [
      {
        url: "https://picsum.photos/800/600?random=11",
        caption: "Ocean View"
      },
      {
        url: "https://picsum.photos/800/600?random=12",
        caption: "Master Suite"
      }
    ],
    listingAgent: {
      name: "Robert Taylor",
      phone: "239-555-9876",
      email: "robert@example.com"
    },
    featured: true
  }
];

export default mockListings;
