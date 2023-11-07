import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carOne from "./assets/car 3.jpg";
import carTwo from "./assets/car 4.jpg";
import carFive from "./assets/car 5.jpg";
import "./App.css"; // Import your CSS file

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const images = slider.querySelectorAll("li");

    gsap.to(images, {
      scale: 0.8, // Initial scale for all images
      scrollTrigger: {
        trigger: slider,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: true, // Remove in production
        toggleActions: "play none none none",
        pin: slider,
      },
    });

    gsap.to(images, {
      xPercent: -100,
      scrollTrigger: {
        trigger: slider,
        start: "top top",
        end: () => `+=${100 * (images.length - 1)}`,
        scrub: 1,
        pin: slider,
      },
    });
  }, []);

  return (
    <div className="slider-container">
      <ul ref={sliderRef} className="image-slider">
        <li>
          <img src={carOne} alt="Image 1" />
        </li>
        <li>
          <img src={carOne} alt="Image 2" />
        </li>
        <li>
          <img src={carOne} alt="Image 2" />
        </li>
        <li>
          <img src={carOne} alt="Image 1" />
        </li>
        <li>
          <img src={carOne} alt="Image 2" />
        </li>
        <li>
          <img src={carOne} alt="Image 2" />
        </li>
        {/* Add more image slides as needed */}
      </ul>
    </div>
  );
};

export default App;
