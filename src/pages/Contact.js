import React from 'react';
import { Helmet } from 'react-helmet';

// Components
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/ContactForm';
import { AnimatedElement } from '../utils/animations';

// Config
import { brand } from '../config/siteConfig';

/**
 * Contact Page Component
 * A page that provides contact information and a contact form.
 */
const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | {brand.name}</title>
        <meta name="description" content={`Get in touch with ${brand.name}. We're here to help with all your real estate needs.`} />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-gray-900 text-white pt-32 pb-16">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title="Contact Us"
              subtitle="We're here to help with all your real estate needs. Get in touch with our team today."
              align="center"
              titleClassName="text-white"
              subtitleClassName="text-gray-300"
            />
          </AnimatedElement>
        </Container>
      </div>
      
      {/* Map Section */}
      <section className="py-16">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="h-96 w-full">
                <iframe
                  title="Office Location"
                  className="w-full h-full border-0"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(brand.address.full)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </AnimatedElement>
        </Container>
      </section>
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Office Hours Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <AnimatedElement animation="fade-in" duration={800}>
            <SectionHeading
              title="Office Hours"
              subtitle="Visit us during our business hours or schedule an appointment."
            />
          </AnimatedElement>
          
          <div className="max-w-3xl mx-auto mt-12">
            <AnimatedElement animation="slide-up" duration={800}>
              <div className="bg-white rounded-lg shadow-soft overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Regular Hours</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-8 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Appointments</h3>
                    <p className="text-gray-600 mb-4">
                      We're available for appointments outside of regular business hours. Please contact us to schedule a meeting.
                    </p>
                    <div className="flex items-center mt-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a2463] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${brand.phone.replace(/[^0-9]/g, '')}`} className="text-gray-700 hover:text-[#0a2463]">
                        {brand.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
