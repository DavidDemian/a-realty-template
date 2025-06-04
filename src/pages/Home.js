import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Hero from '../components/Hero';
import About from '../components/About';
import Properties from '../components/Properties';
import ContactForm from '../components/ContactForm';

// Context
import { PropertyContext } from '../context/PropertyContext';

// Config
import { seo } from '../config/siteConfig';

/**
 * Home Page Component
 * The main landing page of the website.
 */
const Home = () => {
  const { properties } = useContext(PropertyContext);
  
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Properties Section */}
      <Properties
        properties={properties}
        limit={6}
        showHeading={true}
        showFilters={true}
        showViewAll={true}
      />
      
      {/* Contact Section */}
      <ContactForm />
    </>
  );
};

export default Home;
