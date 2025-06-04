import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import Icon from './ui/Icon';
import { brand, seo, footer } from '../config/siteConfig';

/**
 * Footer Component
 * The site footer with navigation links, contact information, and copyright.
 */
const Footer = ({ className = '', ...props }) => {
  
  // Use footer links from siteConfig
  
  return (
    <footer className={`bg-[#0a2342] text-white pt-16 ${className}`} {...props}>
      <Container>
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {/* Brand Information */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12"
              />
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              {seo.description}
            </p>
            
            <div className="flex space-x-4">
              <a
                href={brand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#f0c040] hover:text-[#0a2342] transition-all duration-300"
                aria-label="Facebook"
              >
                <Icon name="facebook" size="sm" />
              </a>
              <a
                href={brand.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#f0c040] hover:text-[#0a2342] transition-all duration-300"
                aria-label="Twitter"
              >
                <Icon name="twitter" size="sm" />
              </a>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#f0c040] hover:text-[#0a2342] transition-all duration-300"
                aria-label="Instagram"
              >
                <Icon name="instagram" size="sm" />
              </a>
              <a
                href={brand.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#f0c040] hover:text-[#0a2342] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size="sm" />
              </a>
            </div>
          </div>
          
          {/* Footer Links */}
          {footer.links.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-[#f0c040] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
          <div className="flex items-center">
            <Icon name="location" className="text-[#f0c040] mr-3" />
            <span className="text-gray-400">{brand.address.full}</span>
          </div>
          
          <div className="flex items-center">
            <Icon name="email" className="text-[#f0c040] mr-3" />
            <a href={`mailto:${brand.email}`} className="text-gray-400 hover:text-white transition-colors duration-300">
              {brand.email}
            </a>
          </div>
          
          <div className="flex items-center">
            <Icon name="phone" className="text-[#f0c040] mr-3" />
            <a href={`tel:${brand.phone.replace(/[^0-9]/g, '')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
              {brand.phone}
            </a>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            {footer.copyright}
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
