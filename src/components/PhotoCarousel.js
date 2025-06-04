import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const PhotoCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // If no images are provided, use a placeholder
  const carouselImages = images && images.length > 0 
    ? images 
    : [{ url: 'https://picsum.photos/800/500?random=1', alt: 'Property' }];

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden shadow-lg">
        {carouselImages.map((image, idx) => (
          <div key={idx} className="keen-slider__slide">
            <img 
              src={image.url || image} 
              alt={image.alt || `Property image ${idx + 1}`} 
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
      
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0 && !instanceRef.current.options.loop}
          />
          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={
              currentSlide ===
                instanceRef.current.track.details.slides.length - 1 &&
              !instanceRef.current.options.loop
            }
          />
        </>
      )}
      
      {loaded && instanceRef.current && carouselImages.length > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(carouselImages.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`mx-1 w-3 h-3 rounded-full ${
                currentSlide === idx ? "bg-green-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " opacity-30 cursor-not-allowed" : "";
  return (
    <button
      onClick={props.onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 ${
        props.left ? "left-2" : "right-2"
      } bg-white p-2 rounded-full shadow hover:shadow-lg z-10${disabled}`}
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

export default PhotoCarousel;
