import React from 'react';
import PropTypes from 'prop-types';

/**
 * SectionHeading Component
 * A consistent heading component for sections with title and optional subtitle.
 */
const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  titleClassName = '',
  subtitleClassName = '',
  className = '',
  ...props
}) => {
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  
  // Combine all classes
  const headingClasses = `
    max-w-3xl
    mb-12
    ${alignClasses[align] || alignClasses.center}
    ${className}
  `;
  
  return (
    <div className={headingClasses} {...props}>
      <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${titleClassName}`}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-lg text-gray-600 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
  className: PropTypes.string,
};

export default SectionHeading;
