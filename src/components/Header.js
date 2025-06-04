import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Container from './ui/Container';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { brand } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';

/**
 * Header Component
 * The site header with navigation and contact information.
 */
const Header = ({ className = '', ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}
        ${className}
      `}
      {...props}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img
              src={brand.logo}
              alt={brand.name}
              className={`h-10 transition-all duration-300 ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  font-medium transition-colors duration-300
                  ${isScrolled
                    ? isActive
                      ? 'text-[#0a2463]'
                      : 'text-gray-700 hover:text-[#0a2463]'
                    : isActive
                      ? 'text-white'
                      : 'text-gray-200 hover:text-white'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Contact Button */}
          <div className="hidden lg:block">
            <Button
              as="link"
              to="/contact"
              variant={isScrolled ? 'primary' : 'secondary'}
              size="md"
            >
              Get In Touch
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10 p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon
              name={isMenuOpen ? 'close' : 'menu'}
              size="lg"
              className={isScrolled ? 'text-gray-800' : 'text-white'}
            />
          </button>
          
          {/* Mobile Menu */}
          <div
            className={`
              fixed inset-0 bg-white z-40 transition-transform duration-300 transform lg:hidden
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <Container className="h-full flex flex-col">
              <div className="flex justify-end py-5">
                <button
                  className="p-2"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <Icon name="close" size="lg" className="text-gray-800" />
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center flex-grow">
                <nav className="flex flex-col items-center space-y-6 mb-8">
                  {navLinks.map((link, index) => (
                    <AnimatedElement
                      key={link.path}
                      animation="fade-in"
                      delay={index * 100}
                      duration={500}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) => `
                          text-2xl font-medium transition-colors duration-300
                          ${isActive ? 'text-[#0a2463]' : 'text-gray-700 hover:text-[#0a2463]'}
                        `}
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </NavLink>
                    </AnimatedElement>
                  ))}
                </nav>
                
                <AnimatedElement animation="fade-in" delay={400} duration={500}>
                  <Button
                    as="link"
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="w-full max-w-xs justify-center"
                    onClick={toggleMenu}
                  >
                    Get In Touch
                  </Button>
                </AnimatedElement>
                
                <div className="mt-12 flex flex-col items-center">
                  <AnimatedElement animation="fade-in" delay={500} duration={500}>
                    <p className="text-gray-600 mb-4">{brand.tagline}</p>
                  </AnimatedElement>
                  
                  <AnimatedElement animation="fade-in" delay={600} duration={500}>
                    <div className="flex space-x-4">
                      <a
                        href={brand.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2463] hover:text-white transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <Icon name="facebook" size="sm" />
                      </a>
                      <a
                        href={brand.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2463] hover:text-white transition-all duration-300"
                        aria-label="Twitter"
                      >
                        <Icon name="twitter" size="sm" />
                      </a>
                      <a
                        href={brand.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2463] hover:text-white transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Icon name="instagram" size="sm" />
                      </a>
                      <a
                        href={brand.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2463] hover:text-white transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Icon name="linkedin" size="sm" />
                      </a>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
