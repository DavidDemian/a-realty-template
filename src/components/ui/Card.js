import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 * A versatile card component with various styling options.
 */
const Card = ({
  children,
  padding = true,
  shadow = 'md',
  hover = false,
  borderTop = false,
  borderColor = '#0a2463',
  className = '',
  ...props
}) => {
  // Padding classes
  const paddingClasses = padding ? 'p-6' : '';
  
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    soft: 'shadow-soft',
  };
  
  // Hover classes
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg' : '';
  
  // Border top classes
  const borderTopClasses = borderTop ? `border-t-4 border-[${borderColor}]` : '';
  
  // Combine all classes
  const cardClasses = `
    bg-white
    rounded-lg
    overflow-hidden
    ${paddingClasses}
    ${shadowClasses[shadow] || shadowClasses.md}
    ${hoverClasses}
    ${borderTopClasses}
    ${className}
  `;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'soft']),
  hover: PropTypes.bool,
  borderTop: PropTypes.bool,
  borderColor: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
