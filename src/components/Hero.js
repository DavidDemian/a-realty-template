import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import Button from './ui/Button';
import { hero } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';
import './Hero.css';

/**
 * Hero Component
 * The main hero section for the homepage with a background image, heading, and call-to-action buttons.
 */
const Hero = ({ className = '', ...props }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        // Parallax effect - move background slower than scroll
        backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
      {...props}
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="hero-background absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2342]/70 to-[#0a2342]/90"></div>
      
      <Container className="relative z-10 py-20">
        <div className="max-w-3xl">
          <AnimatedElement animation="fade-in" duration={1000}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.heading}
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-in" delay={300} duration={1000}>
            <p className="text-xl text-gray-200 mb-8">
              {hero.description}
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-in" delay={600} duration={1000}>
            <div className="flex flex-wrap gap-4">
              <Button
                as="link"
                to="/properties"
                variant="primary"
                size="lg"
                className="bg-[#0a2342] hover:bg-[#0a2342]/90 border-[#f0c040] text-white"
              >
                {hero.primaryButtonText}
              </Button>
              
              <Button
                as="link"
                to="/contact"
                variant="white"
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#0a2342] border-[#f0c040]"
              >
                {hero.secondaryButtonText}
              </Button>
            </div>
          </AnimatedElement>
          
          {/* Stats */}
          {hero.stats && hero.stats.length > 0 && (
            <AnimatedElement animation="fade-in" delay={900} duration={1000}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {hero.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-transform hover:scale-105 duration-300"
                  >
                    <div className="text-3xl font-bold text-[#f0c040] mb-2">{stat.value}</div>
                    <div className="text-white">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          )}
        </div>
      </Container>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <AnimatedElement animation="fade-in" delay={1200} duration={1000}>
          <div className="flex flex-col items-center">
            <span className="text-[#f0c040] text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-[#f0c040] rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-[#f0c040] rounded-full animate-bounce"></div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
