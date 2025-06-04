/**
 * Site Configuration
 * This file contains all the configuration for the site.
 * It can be easily modified to change the site's appearance and content.
 */

// Brand Information
export const brand = {
  name: 'A Realty',
  tagline: 'Luxury Real Estate',
  description: 'A premier real estate agency specializing in luxury properties throughout South Florida.',
  logo: '/assets/lllogo.png',
  email: 'contact@arealty.com',
  phone: '(305) 555-1234',
  address: {
    street: '123 pizza Drive',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33139',
    full: '123 Ocean Drive, Miami Beach, FL 33139'
  },
  social: {
    facebook: 'https://facebook.com/arealty',
    twitter: 'https://twitter.com/arealty',
    instagram: 'https://instagram.com/arealty',
    linkedin: 'https://linkedin.com/company/arealty'
  }
};

// SEO Configuration
export const seo = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
  keywords: 'real estate, luxury homes, properties, south florida, miami, palm beach',
  ogImage: '/assets/og-image.jpg',
  twitterHandle: '@arealty'
};

// Theme Configuration
export const theme = {
  colors: {
    primary: '#0a2342',
    accent: '#f0c040',
    neutral: '#ffffff',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#ffffff'
    }
  }
};

// Hero Section Configuration
export const hero = {
  backgroundImage: '/assets/IMG_3562.PNG',
  heading: 'Welcome to Your Next Chapter — South Florida Living, Redefined.',
  description: 'Discover luxury properties in the most desirable locations throughout Miami, Fort Lauderdale, and Palm Beach.',
  primaryButtonText: 'View Properties',
  secondaryButtonText: 'Contact Us',
  stats: [
    {
      value: '500+',
      label: 'Properties Sold'
    },
    {
      value: '98%',
      label: 'Client Satisfaction'
    },
    {
      value: '15+',
      label: 'Years Experience'
    }
  ]
};

// About Section Configuration
export const about = {
  heading: 'About A Realty',
  description: 'A premier real estate agency specializing in luxury properties throughout South Florida.',
  image: '/assets/about-image.jpg',
  features: [
    {
      icon: 'home',
      title: 'Luxury Properties',
      description: 'We specialize in high-end properties in the most desirable locations.'
    },
    {
      icon: 'location',
      title: 'Prime Locations',
      description: 'Our properties are located in the most sought-after neighborhoods.'
    },
    {
      icon: 'phone',
      title: 'Personalized Service',
      description: 'We provide tailored service to meet your specific needs and preferences.'
    }
  ]
};

// Team Configuration
export const team = {
  heading: 'Meet Our Team',
  description: 'Our experienced team of real estate professionals is dedicated to helping you find your perfect home.',
  members: [
    {
      name: 'John Smith',
      title: 'Principal Broker',
      image: '/assets/team/john-smith.jpg',
      bio: 'With over 20 years of experience in luxury real estate, John has an unparalleled knowledge of the South Florida market.',
      contact: {
        email: 'john@arealty.com',
        phone: '(305) 555-1235'
      },
      social: {
        linkedin: 'https://linkedin.com/in/johnsmith',
        twitter: 'https://twitter.com/johnsmith'
      }
    },
    {
      name: 'Jane Doe',
      title: 'Senior Agent',
      image: '/assets/team/jane-doe.jpg',
      bio: 'Jane specializes in waterfront properties and has helped hundreds of clients find their dream homes.',
      contact: {
        email: 'jane@arealty.com',
        phone: '(305) 555-1236'
      },
      social: {
        linkedin: 'https://linkedin.com/in/janedoe',
        twitter: 'https://twitter.com/janedoe'
      }
    }
  ]
};

// Featured Listing of the Month
export const featuredListing = {
  title: 'Listing of the Month',
  property: {
    name: 'Oceanfront Luxury Villa',
    address: '123 Ocean Drive, Miami Beach, FL 33139',
    price: '$4,950,000',
    image: '/assets/IMG_3562.PNG',
    beds: 5,
    baths: 6.5,
    sqft: 4850,
    description: 'This stunning oceanfront villa offers breathtaking views and luxurious amenities including a private pool, home theater, and chef\'s kitchen.',
    features: [
      'Private Beach Access',
      'Infinity Pool',
      'Smart Home Technology',
      'Wine Cellar',
      'Gourmet Kitchen'
    ]
  }
};

// Contact Section Configuration
export const contact = {
  heading: 'Get In Touch',
  description: 'We\'re here to help with all your real estate needs. Reach out to us today.',
  email: brand.email,
  phone: brand.phone,
  address: brand.address.full,
  formSubmitEndpoint: '/api/contact',
  mapLocation: brand.address.full
};

// Properties Section Configuration
export const propertiesSection = {
  heading: 'Featured Properties',
  description: 'Browse our selection of luxury properties in South Florida.',
  viewAllButtonText: 'View All Properties'
};

// Footer Configuration
export const footer = {
  copyright: `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`,
  links: [
    {
      title: 'Navigation',
      items: [
        { label: 'Home', url: '/' },
        { label: 'Browse Listings', url: '/properties' },
        { label: 'Contact', url: '/contact' }
      ]
    }
  ]
};

// Export all configurations as default
const siteConfig = {
  brand,
  seo,
  theme,
  hero,
  about,
  team,
  featuredListing,
  contact,
  propertiesSection,
  footer
};

export default siteConfig;
