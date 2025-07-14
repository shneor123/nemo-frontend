
import React, { useState } from "react"
import inbox from "../../assets/img/home-page/inbox-slider.png";
import Boards from "../../assets/img/home-page/board-slider.png";
import Planner from "../../assets/img/home-page/planner-slider.png";

const slides = [
    {
        title: "Inbox",
        text: <>
            When it’s on your mind, it goes in your Inbox. <br />
            Capture your to-dos from <br />
            anywhere, anytime.
        </>,
        img: inbox,
    },
    {
        title: "Boards",
        text: <>
            Your to-do list may be long, but it can be <br />
            manageable! Keep tabs on everything <br />
            from 'to-dos to tackle' to 'mission  <br />
            accomplished!'
        </>,
        img: Boards,
    },
    {
        title: "Planner",
        text: <>
            Drag, drop, get it done. Snap your top <br />
            tasks into your calendar and make time <br />
            for what truly matters.
        </>,
        img: Planner,
    },
];

export const SectionTowHomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="slider-section">
            <div className="slider-header">
                <h4>NEMO 101</h4>
                <h2>Your productivity powerhouse</h2>
                <p>
                    Stay organized and efficient with Inbox, Boards, and Planner. Every<br />
                    to-do, idea, or responsibility—no matter how small—finds its place,<br />
                    keeping you at the top of your game.
                </p>
            </div>
            <section className="slider-section">
                <div className="slider-wrapper">
                    <div className="slider-container">
                        <div className="slider-tabs">
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`slider-tab ${index === currentSlide ? "active" : ""}`}
                                    onClick={() => setCurrentSlide(index)}
                                >
                                    <h4>{slide.title}</h4>
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
                </div>
            </section>
        </div >
    )
}