import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import carThree from "./assets/car 3.jpg";
import carFour from "./assets/car 4.jpg";
import carFive from "./assets/car 5.jpg";
import "./App.css";

const App = () => {
  const sliderRef = useRef(null);
  useEffect(() => {
    const carousel = document.querySelector(".carousel"),
      firstImg = carousel.querySelectorAll("img")[1],
      arrowIcons = document.querySelectorAll(".wrapper i");

    let isDragStart = false,
      isDragging = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;
    arrowIcons[0].style.display = "block";
    const showHideIcons = () => {
      // showing and hiding prev/next icon according to carousel scroll left value
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
      // arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      // arrowIcons[1].style.display =
      //   carousel.scrollLeft == scrollWidth ? "none" : "block";
      if (carousel.clientWidth <= 550) {
        arrowIcons[0].style.display =
          carousel.scrollLeft == 0 ? "none" : "none";
        arrowIcons[1].style.display =
          carousel.scrollLeft == scrollWidth ? "none" : "none";
      }
    };

    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft +=
          icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
      });
    });

    const autoSlide = () => {
      // if there is no image left to scroll then return from here
      if (
        carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
          -1 ||
        carousel.scrollLeft <= 0
      )
        return;

      positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
      let firstImgWidth = firstImg.clientWidth;
      // getting difference value that needs to add or reduce from carousel left to take middle img center
      let valDifference = firstImgWidth - positionDiff;

      if (carousel.scrollLeft > prevScrollLeft) {
        // if user is scrolling to the right
        return (carousel.scrollLeft +=
          positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
      }
      // if user is scrolling to the left
      carousel.scrollLeft -=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    };

    const dragStart = (e) => {
      // updatating global variables value on mouse down event
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      // scrolling images/carousel to left according to mouse pointer
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    };

    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");

      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };
    if (carousel.clientWidth <= 550) {
      const rightButton = document.querySelector(".wrapper i#right");
      rightButton.click();
      rightButton.click();
      rightButton.click();
    }
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);
  }, []);
  useEffect(() => {
    const slider = sliderRef.current;
    const images = slider.querySelectorAll("img");

    let isDragging = false;
    let startX;
    let startScrollLeft;

    images.forEach((image, index) => {
      image.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startScrollLeft = slider.scrollLeft;
      });

      image.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const distance = e.clientX - startX;
        slider.scrollLeft = startScrollLeft - distance;
        // scaleImages(images, index);
      });
      image.addEventListener("click", (e) => {
        scaleImages(images, index);
      });
      image.addEventListener("dblclick", (e) => {
        reduceImages(images, index);
      });

      image.addEventListener("mouseup", () => {
        isDragging = false;
      });

      image.addEventListener("mouseleave", () => {
        isDragging = false;
      });
    });
  }, []);

  const scaleImages = (images, activeIndex) => {
    images.forEach((image, index) => {
      const isActive = index === activeIndex;

      gsap.to(image, {
        scale: isActive ? "1.2" : "0.8", // Scale up the active image
      });
    });
  };
  const reduceImages = (images, activeIndex) => {
    images.forEach((image, index) => {
      const isActive = index === activeIndex;

      gsap.to(image, {
        scale: "0.95", // Scale up the active image
      });
    });
  };

  return (
    <article className="programsWrapper" id="programs">
      <article className="wrapper">
        <i id="left" className="fa-solid fa-angle-left"></i>
        <div className="carousel" ref={sliderRef}>
          <img src={carFour} alt="A fast car" />
          <img src={carThree} alt="A fast car" />
          <img src={carFour} alt="A fast car" />
          <img src={carThree} alt="A fast car" />
          <img src={carFour} alt="A fast car" />
          <img src={carThree} alt="A fast car" />
        </div>
        <i id="right" className="fa-solid fa-angle-right"></i>
      </article>
    </article>
  );
};

export default App;
