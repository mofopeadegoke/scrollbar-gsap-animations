import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carThree from "./assets/car 3.jpg";
import carFour from "./assets/car 4.jpg";
import carFive from "./assets/car 5.jpg";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const images = slider.querySelectorAll("img");

    images.forEach((image, index) => {
      ScrollTrigger.create({
        trigger: image,
        start: "center center",
        end: "center center",
        toggleClass: "active",
        markers: true, // Remove in production
      });

      gsap.to(image, {
        scale: 1.2, // Scale up the active image
        scrollTrigger: {
          trigger: image,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          pin: slider,
        },
      });

      gsap.to(image, {
        xPercent: -100 * index,
        scrollTrigger: {
          trigger: slider,
          start: "top top",
          end: () => `+=${100 * (images.length - 1)}`,
          scrub: 1,
          pin: slider,
        },
      });
    });
  }, []);

  return (
    <article className="programsWrapper" id="programs">
      <div className="heading">
        <h2>Programs & Curriculum</h2>
        <p>Nurturing Growth and Empowering Learners for a Bright Future</p>
      </div>
      <article className="wrapper">
        <div className="carousel" ref={sliderRef}>
          <img src={carThree} alt="" />
          <img src={carFour} alt="" />
          <img src={carFive} alt="" />
        </div>
      </article>
    </article>
  );
};

export default App;
