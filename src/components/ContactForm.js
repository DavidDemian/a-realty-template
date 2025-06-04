import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { contact, brand } from '../config/siteConfig';
import { AnimatedElement } from '../utils/animations';

/**
 * ContactForm Component
 * A form for users to contact the real estate agency.
 */
const ContactForm = ({ className = '', ...props }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    });
    
    // In a real application, you would send the form data to a server
    // Example with formspree:
    // fetch(contact.formspreeEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setFormStatus({
    //       submitted: true,
    //       success: true,
    //       message: 'Thank you for your message! We will get back to you soon.'
    //     });
    //     setFormData({
    //       name: '',
    //       email: '',
    //       phone: '',
    //       subject: '',
    //       message: '',
    //       newsletter: false
    //     });
    //   })
    //   .catch(error => {
    //     setFormStatus({
    //       submitted: true,
    //       success: false,
    //       message: 'Oops! Something went wrong. Please try again later.'
    //     });
    //   });
  };
  
  return (
    <section id="contact" className={`py-20 bg-gray-50 ${className}`} {...props}>
      <Container>
        <AnimatedElement animation="fade-in" duration={800}>
          <SectionHeading
            title={contact.heading}
            subtitle={contact.description}
          />
        </AnimatedElement>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Contact Information */}
          <AnimatedElement animation="slide-right" duration={800}>
            <div className="h-full">
              <div className="bg-white rounded-lg shadow-soft p-8 h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon name="location" size="lg" className="text-[#0a2342] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-700">Address</h4>
                      <p className="text-gray-600 mt-1">{brand.address.full}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon name="email" size="lg" className="text-[#0a2342] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-700">Email</h4>
                      <a href={`mailto:${brand.email}`} className="text-gray-600 hover:text-[#0a2342] mt-1 block">
                        {brand.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon name="phone" size="lg" className="text-[#0a2342] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-700">Phone</h4>
                      <a href={`tel:${brand.phone.replace(/[^0-9]/g, '')}`} className="text-gray-600 hover:text-[#0a2342] mt-1 block">
                        {brand.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href={brand.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2342] hover:text-white transition-all duration-300"
                    >
                      <Icon name="facebook" size="sm" />
                    </a>
                    <a
                      href={brand.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2342] hover:text-white transition-all duration-300"
                    >
                      <Icon name="twitter" size="sm" />
                    </a>
                    <a
                      href={brand.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2342] hover:text-white transition-all duration-300"
                    >
                      <Icon name="instagram" size="sm" />
                    </a>
                    <a
                      href={brand.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0a2342] hover:text-white transition-all duration-300"
                    >
                      <Icon name="linkedin" size="sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Contact Form */}
          <AnimatedElement animation="slide-left" duration={800} delay={300}>
            <div className="h-full">
              <div className="bg-white rounded-lg shadow-soft p-8 md:p-10 h-full">
                {formStatus.submitted && formStatus.success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">{formStatus.message}</p>
                    <Button
                      onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Your email"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your message"
                      ></textarea>
                      {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#0a2342] focus:ring-[#0a2342] border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                          {contact.newsletterText}
                        </label>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="min-w-[150px] justify-center bg-[#0a2342] hover:bg-[#0a2342]/90 border-[#f0c040] text-white transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
};

ContactForm.propTypes = {
  className: PropTypes.string
};

export default ContactForm;
