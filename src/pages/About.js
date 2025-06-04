import React from 'react';
import { Helmet } from 'react-helmet';

// Components
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
import { AnimatedElement } from '../utils/animations';

// Config
import { brand } from '../config/siteConfig';

/**
 * About Page Component
 * A page that provides information about the real estate agency.
 */
const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | {brand.name}</title>
        <meta name="description" content={`Learn more about ${brand.name}, a premier real estate agency specializing in luxury properties throughout South Florida.`} />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-gray-900 text-white pt-32 pb-16">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title="About Us"
              subtitle="Learn more about our agency and our commitment to excellence in real estate."
              align="center"
              titleClassName="text-white"
              subtitleClassName="text-gray-300"
            />
          </AnimatedElement>
        </Container>
      </div>
      
      {/* About Section */}
      <About className="pt-20" />
      
      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title="Our Mission & Values"
              subtitle="We are committed to providing exceptional service and expertise to help our clients find their perfect home."
            />
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedElement animation="slide-up" delay={100} duration={800}>
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0a2463]/10 text-[#0a2463] flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We believe in transparency and honesty in every transaction, building trust with our clients through ethical practices.
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={200} duration={800}>
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0a2463]/10 text-[#0a2463] flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from customer service to property selection and negotiation.
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={300} duration={800}>
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0a2463]/10 text-[#0a2463] flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Client-Focused</h3>
                <p className="text-gray-600">
                  Our clients' needs and goals are at the center of everything we do, ensuring a personalized and satisfying experience.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </section>
      
      {/* Contact Section */}
      <ContactForm />
    </>
  );
};

export default AboutPage;
