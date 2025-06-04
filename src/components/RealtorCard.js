import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import realtorImage from '../assets/IMG_3562.PNG';

// Icons as separate components for better organization and reusability
const Icon = ({ children, className = "" }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    {children}
  </span>
);

const PhoneIcon = memo(() => (
  <Icon className="text-gray-500 mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  </Icon>
));

const EmailIcon = memo(() => (
  <Icon className="text-gray-500 mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  </Icon>
));

const LinkedInIcon = memo(() => (
  <Icon className="text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  </Icon>
));

// Default realtor information
const DEFAULT_REALTOR = {
  name: "Mohamed Autef",
  title: "Real Estate Agent",
  email: "MHMD@juliesrealty.net",
  image: realtorImage,
  experience: "10+ years of experience",
  description: "Specializing in luxury properties and helping clients find their dream homes.",
  phone: "(305) 399-4811",
  linkedin: "https://linkedin.com/in/mohamed-autef",
  languages: ["English", "Arabic"],
  certifications: ["Licensed Real Estate Agent", "Certified Luxury Home Marketing Specialist"]
};

// Separate components for better organization
const RealtorImage = memo(({ src, alt, onError }) => (
  <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden border-2 border-green-100 shadow-sm">
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform hover:scale-105"
      onError={onError}
    />
  </div>
));

const RealtorInfo = memo(({ name, title }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
    <p className="text-gray-600">{title}</p>
  </div>
));

const RealtorDescription = memo(({ description, experience, languages, certifications }) => (
  <div className="mb-4">
    <p className="text-gray-700 mb-2">{description}</p>
    <p className="text-gray-700 font-medium">{experience}</p>
    
    {languages && languages.length > 0 && (
      <div className="mt-2">
        <p className="text-sm text-gray-500">Languages:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {languages.map((language, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {language}
            </span>
          ))}
        </div>
      </div>
    )}
    
    {certifications && certifications.length > 0 && (
      <div className="mt-2">
        <p className="text-sm text-gray-500">Certifications:</p>
        <div className="flex flex-col gap-1 mt-1">
          {certifications.map((cert, index) => (
            <span key={index} className="text-xs text-gray-700">
              • {cert}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
));

const ContactLinks = memo(({ phone, email, linkedin }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2 group">
      <PhoneIcon />
      <a 
        href={`tel:${phone}`} 
        className="text-gray-700 group-hover:text-green-600 transition-colors"
        aria-label={`Call ${phone}`}
      >
        {phone}
      </a>
    </div>
    
    <div className="flex items-center mb-2 group">
      <EmailIcon />
      <a 
        href={`mailto:${email}`} 
        className="text-gray-700 group-hover:text-green-600 transition-colors"
        aria-label={`Email ${email}`}
      >
        {email}
      </a>
    </div>
    
    {linkedin && (
      <div className="flex items-center group">
        <LinkedInIcon />
        <a 
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 group-hover:text-green-600 transition-colors ml-2"
          aria-label="View LinkedIn profile"
        >
          LinkedIn Profile
        </a>
      </div>
    )}
  </div>
));

// Main component with React.memo for performance optimization
// Contact form component for the flipped card
const ContactForm = memo(({ realtorName, onCancel }) => {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Contact {realtorName}</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Back to agent info"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form
        action="https://formspree.io/f/xrbkglvq" 
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Tell us how we can help you..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <input type="hidden" name="agent" value={realtorName} />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
});

const RealtorCard = memo(({ realtor }) => {
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Use the provided realtor or fall back to default
  const realtorInfo = {
    ...DEFAULT_REALTOR,
    ...realtor
  };

  const handleContactClick = () => {
    setIsFlipped(true);
  };

  const handleCancelContact = () => {
    setIsFlipped(false);
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn('Realtor image failed to load, using fallback image');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" role="region" aria-label="Realtor Information">
      <div className={`relative w-full h-full transition-all duration-500 ${isFlipped ? 'hidden' : 'block'}`}>
        <div className="flex items-center mb-4">
          <RealtorImage 
            src={imageError ? '/assets/lllogo.png' : realtorInfo.image} 
            alt={`${realtorInfo.name} - ${realtorInfo.title}`}
            onError={handleImageError}
          />
          <RealtorInfo name={realtorInfo.name} title={realtorInfo.title} />
        </div>
        
        <RealtorDescription 
          description={realtorInfo.description}
          experience={realtorInfo.experience}
          languages={realtorInfo.languages}
          certifications={realtorInfo.certifications}
        />
        
        <ContactLinks 
          phone={realtorInfo.phone}
          email={realtorInfo.email}
          linkedin={realtorInfo.linkedin}
        />
        
        <div className="flex gap-2">
          <button
            onClick={handleContactClick}
            className="flex-1 bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label={`Contact ${realtorInfo.name}`}
          >
            Contact Agent
          </button>
          
          <button
            onClick={() => window.open(`https://wa.me/${realtorInfo.phone.replace(/\D/g, '')}`)}
            className="bg-green-100 text-green-700 p-3 rounded-lg hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Contact via WhatsApp"
            title="Contact via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${realtorInfo.name} - ${realtorInfo.title}`,
                  text: `Contact ${realtorInfo.name} at ${realtorInfo.phone} or ${realtorInfo.email}`,
                  url: window.location.href,
                }).catch(err => console.warn('Error sharing:', err));
              } else {
                alert(`Contact ${realtorInfo.name} at ${realtorInfo.phone} or ${realtorInfo.email}`);
              }
            }}
            className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            aria-label="Share agent contact information"
            title="Share agent contact information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`relative w-full h-full transition-all duration-500 ${isFlipped ? 'block' : 'hidden'}`}>
        <ContactForm 
          realtorName={realtorInfo.name} 
          onCancel={handleCancelContact} 
        />
      </div>
    </div>
  );
});

// PropTypes validation
RealtorCard.propTypes = {
  realtor: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    experience: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    linkedin: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    certifications: PropTypes.arrayOf(PropTypes.string)
  }),
};

// Display name for debugging
RealtorCard.displayName = 'RealtorCard';
RealtorImage.displayName = 'RealtorImage';
RealtorInfo.displayName = 'RealtorInfo';
RealtorDescription.displayName = 'RealtorDescription';
ContactLinks.displayName = 'ContactLinks';
ContactForm.displayName = 'ContactForm';
PhoneIcon.displayName = 'PhoneIcon';
EmailIcon.displayName = 'EmailIcon';
LinkedInIcon.displayName = 'LinkedInIcon';

export default RealtorCard;
