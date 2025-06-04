import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container Component
 * A responsive container component that centers content and adds consistent padding.
 */
const Container = ({
  children,
  size = 'default',
  padding = true,
  className = '',
  ...props
}) => {
  // Container size classes
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-2xl',
    full: 'max-w-full',
  };
  
  // Padding classes
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';
  
  // Combine all classes
  const containerClasses = `
    mx-auto
    ${sizeClasses[size] || sizeClasses.default}
    ${paddingClasses}
    ${className}
  `;
  
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'full']),
  padding: PropTypes.bool,
  className: PropTypes.string,
};

export default Container;
