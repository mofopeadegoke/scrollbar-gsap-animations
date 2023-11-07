import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import carThree from "./assets/car 3.jpg";
import carFour from "./assets/car 4.jpg";
import carFive from "./assets/car 5.jpg";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const racesRef = useRef(null);

  useEffect(() => {
    const races = racesRef.current;

    function getScrollAmount() {
      const racesWidth = races.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(racesWidth - windowWidth);
    }

    const tween = gsap.to(races, {
      x: getScrollAmount,
      duration: () => {
        return Math.abs(getScrollAmount()) / 100; // Adjust the divisor for desired scroll speed
      },
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: ".racesWrapper",
      start: "top 20%",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  }, []);

  return (
    <div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        quia ipsum ullam facere dignissimos quos quisquam. Pariatur excepturi
        eveniet error sint similique. Cupiditate exercitationem quaerat harum
        cumque fuga commodi ipsum nulla, tempora dignissimos error voluptates
        nobis praesentium pariatur explicabo possimus?
      </p>
      <div className="racesWrapper">
        <div className="races" ref={racesRef}>
          <img src={carThree} alt="A ferarri" />
          <img src={carFour} alt="A fast car" />
          <img src={carFour} alt="A fast car" />
          <img src={carThree} alt="A ferarri" />
          <img src={carFour} alt="A fast car" />
          <img src={carFour} alt="A fast car" />
        </div>
      </div>
      <div className="space-50vh lightBG">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quia ipsum ullam facere dignissimos quos quisquam. Pariatur excepturi
          eveniet error sint similique. Cupiditate exercitationem quaerat harum
          cumque fuga commodi ipsum nulla, tempora dignissimos error voluptates
          nobis praesentium pariatur explicabo possimus?
        </p>
      </div>
    </div>
  );
}

export default App;
