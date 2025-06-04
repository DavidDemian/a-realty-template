import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Button Component
 * A versatile button component that can be rendered as a button or a link.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  to = '',
  href = '',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-[#0a2463] text-white hover:bg-[#061539] focus:ring-[#0a2463]',
    secondary: 'bg-[#3e92cc] text-white hover:bg-[#2a7db3] focus:ring-[#3e92cc]',
    accent: 'bg-[#d8315b] text-white hover:bg-[#b02649] focus:ring-[#d8315b]',
    outline: 'bg-transparent border border-[#0a2463] text-[#0a2463] hover:bg-[#0a2463] hover:text-white focus:ring-[#0a2463]',
    ghost: 'bg-transparent text-[#0a2463] hover:bg-[#0a2463]/10 focus:ring-[#0a2463]',
    white: 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-200 shadow-sm',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${disabled ? disabledClasses : ''}
    ${className}
  `;
  
  // Render as link (React Router Link)
  if (as === 'link' && to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Render as anchor
  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'ghost', 'white']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  as: PropTypes.oneOf(['button', 'link', 'a']),
  to: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
