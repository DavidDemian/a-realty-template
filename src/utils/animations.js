import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * useIntersectionObserver Hook
 * A custom hook that uses the Intersection Observer API to detect when an element is visible in the viewport.
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1,
    });
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.root, options.rootMargin, options.threshold, hasIntersected]);
  
  return { ref, isIntersecting, hasIntersected };
};

/**
 * AnimatedElement Component
 * A component that animates its children when they enter the viewport.
 */
export const AnimatedElement = ({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  className = '',
  style = {},
  ...props
}) => {
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
  });
  
  const shouldAnimate = once ? hasIntersected : isIntersecting;
  
  const animationStyles = {
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? 'none' : getInitialTransform(animation),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
    ...style,
  };
  
  return (
    <div
      ref={ref}
      className={className}
      style={animationStyles}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Helper function to get the initial transform value based on the animation type.
 */
const getInitialTransform = (animation) => {
  switch (animation) {
    case 'fade-in':
      return 'none';
    case 'slide-up':
      return 'translateY(20px)';
    case 'slide-down':
      return 'translateY(-20px)';
    case 'slide-left':
      return 'translateX(20px)';
    case 'slide-right':
      return 'translateX(-20px)';
    case 'zoom-in':
      return 'scale(0.95)';
    case 'zoom-out':
      return 'scale(1.05)';
    default:
      return 'none';
  }
};

AnimatedElement.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    'fade-in',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'zoom-in',
    'zoom-out',
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  once: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * useScrollProgress Hook
 * A custom hook that tracks scroll progress on the page.
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollProgress;
};

/**
 * useParallax Hook
 * A custom hook that creates a parallax effect based on scroll position.
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollOffset = (elementTop - windowHeight) * speed;
      
      setOffset(scrollOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return { ref, offset };
};

/**
 * ParallaxElement Component
 * A component that creates a parallax effect on its children.
 */
export const ParallaxElement = ({
  children,
  speed = 0.5,
  className = '',
  style = {},
  ...props
}) => {
  const { ref, offset } = useParallax(speed);
  
  const parallaxStyle = {
    transform: `translateY(${offset}px)`,
    ...style,
  };
  
  return (
    <div
      ref={ref}
      className={className}
      style={parallaxStyle}
      {...props}
    >
      {children}
    </div>
  );
};

ParallaxElement.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
