import React from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { about } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';
import FeaturedListing from './FeaturedListing';

/**
 * About Component
 * Displays information about the real estate agency and the featured listing of the month.
 */
const About = ({ className = '', ...props }) => {
  return (
    <section id="about" className={`py-16 ${className}`} {...props}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <AnimatedElement animation="slide-right" duration={800}>
            <div>
              <SectionHeading
                title={about.heading}
                subtitle={about.description}
                align="left"
              />
              
              <div className="space-y-6 mt-8">
                {about.features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-[#0a2342]/10 text-[#0a2342]">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
          
          {/* Featured Listing */}
          <FeaturedListing />
        </div>
      </Container>
    </section>
  );
};

About.propTypes = {
  className: PropTypes.string
};

export default About;
