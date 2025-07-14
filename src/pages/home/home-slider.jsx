// HomeSliderSection.jsx
import { useState } from "react";
import inbox from "../../assets/img/home-page/inbox-slider.png";
import Boards from "../../assets/img/home-page/board-slider.png";
import Planner from "../../assets/img/home-page/planner-slider.png";

const slides = [
  {
    title: "Inbox",
    text: "When it’s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
    img: inbox,
  },
  {
    title: "Boards",
    text: "Your to-do list may be long, but it can be manageable! Keep tabs on everything from 'to-dos to tackle' to 'mission accomplished!'",
    img: Boards,
  },
  {
    title: "Planner",
    text: "Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.",
    img: Planner,
  },
];

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="slider-wrapper">
      <div className="slider-header">
        <h4 className="name">NEMO 101</h4>
        <h2>Your productivity powerhouse</h2>
        <p>
          Stay organized and efficient with Inbox, Boards, and Planner.
          Every to-do, idea, or responsibility—no matter how small—finds its place,
          keeping you at the top of your game.
        </p>
      </div>
      <section className="slider-section">
        <div className="slider-container">
          <div className="slider-tabs">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slider-tab ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              >
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            ))}
          </div>

          <div className="slider-image">
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <img
              key={currentSlide}
              src={slides[currentSlide].img}
              alt={slides[currentSlide].title}
              className="fade-in"
            />
          </div>
        </div>
      </section>
    </div>

  );
}