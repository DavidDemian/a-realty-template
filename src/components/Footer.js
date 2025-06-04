import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import Icon from './ui/Icon';
import { brand } from '../config/siteConfig';

/**
 * Footer Component
 * A compact, organized footer with essential navigation and contact information.
 */
const Footer = ({ className = '', ...props }) => {
  return (
    <footer className={`bg-[#0a2342] text-white pt-10 ${className}`} {...props}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block mb-4">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-24"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              A premier real estate agency specializing in luxury properties throughout Florida.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center md:justify-end">
            <div className="text-center md:text-right">
              <h3 className="text-base font-bold mb-3">Navigation</h3>
              <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-[#f0c040] text-sm transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="text-gray-400 hover:text-[#f0c040] text-sm transition-colors duration-300">
                    Browse Listings
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-[#f0c040] text-sm transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-gray-800">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href={brand.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#f0c040] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Icon name="facebook" size="sm" />
            </a>
            <a
              href={brand.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#f0c040] transition-colors duration-300"
              aria-label="Twitter"
            >
              <Icon name="twitter" size="sm" />
            </a>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#f0c040] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Icon name="instagram" size="sm" />
            </a>
            <a
              href={brand.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#f0c040] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" size="sm" />
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href={`mailto:${brand.email}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {brand.email}
            </a>
            <span className="text-gray-600">•</span>
            <a href={`tel:${brand.phone.replace(/[^0-9]/g, '')}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {brand.phone}
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
