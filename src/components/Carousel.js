import React, { useState } from 'react';
import properties from '../Data/propertiesData';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 768px)': {
          slides: { perView: 2, spacing: 16 },
        },
        '(min-width: 1200px)': {
          slides: { perView: 3, spacing: 24 },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        
        slider.on("created", () => {
          setLoaded(true);
          nextTimeout();
        });
        
        slider.on("slideChanged", (s) => {
          setCurrentSlide(s.track.details.rel);
          nextTimeout();
        });
        
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
      },
    ]
  );

  return (
    <div className="relative max-w-7xl mx-auto">
      <div ref={sliderRef} className="keen-slider">
        {properties.map((property) => (
          <div key={property.id} className="keen-slider__slide">
            <Link to={`/properties/${property.id}`} className="block">
              <div className="border-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white rounded-xl">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                  <div className="absolute top-0 right-0 bg-navy text-white px-3 py-1 m-3 text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-2 text-navy">{property.title}</h2>
                  <p className="font-sans text-gray-500 mb-3">{property.address}</p>
                  <p className="font-sans text-navy font-bold text-lg">{property.price}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="font-sans text-sm text-gray-600 line-clamp-2">{property.description || 'Beautiful property in a prime location.'}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}


      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => {
              if (instanceRef.current) {
                try {
                  instanceRef.current.prev();
                } catch (error) {
                  console.error("Error navigating to previous slide:", error);
                }
              }
            }}
            disabled={currentSlide === 0 && !instanceRef.current?.options?.loop}
          />
          <Arrow
            onClick={(e) => {
              if (instanceRef.current) {
                try {
                  instanceRef.current.next();
                } catch (error) {
                  console.error("Error navigating to next slide:", error);
                }
              }
            }}
            disabled={
              currentSlide ===
                instanceRef.current?.track?.details?.slides?.length - 1 &&
              !instanceRef.current?.options?.loop
            }
          />
        </>
      )}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-6">
          {[...Array(properties.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                if (instanceRef.current) {
                  try {
                    instanceRef.current.moveToIdx(idx);
                  } catch (error) {
                    console.error("Error moving to slide:", error);
                  }
                }
              }}
              className={`mx-1.5 w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-navy scale-110" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " opacity-30 cursor-not-allowed" : "";
  
  const handleClick = (e) => {
    e.stopPropagation();
    if (props.onClick && !props.disabled) {
      try {
        props.onClick(e);
      } catch (error) {
        console.error("Error navigating carousel:", error);
      }
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`absolute top-1/2 transform -translate-y-1/2 ${
        props.left ? "left-2" : "right-2"
      } bg-white p-2 rounded-full shadow-md hover:shadow-lg z-10 transition-all duration-300${disabled}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0a2463"
        className="w-6 h-6"
      >
        {props.left ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        )}
      </svg>
    </button>
  );
}

export default Carousel;
