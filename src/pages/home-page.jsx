import React from "react";
import { Link } from "react-router-dom";
import imgHero from "../assets/img/hero.png";
import imgDemo from "../assets/img/demo.jpg";

export const HomePage = () => {
  return (
    <section className="homepage-container">
      <section className="homepage-wrapper">
        <section className="homepage">
          <div className="homepage-text">
            <h1 className="homepage-title"> Nemo helps teams move work forward.</h1>
            <p className="homepage-paragraph">
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Nemo.
            </p>
            <Link style={{ all: "unset" }} to={"/workspace"}>
              <button className="demo-btn">Start Demo</button>
            </Link>
          </div>
          <div className="homepage-hero">
            <img src={imgHero} alt="" />
          </div>
        </section>
        <section className="app-info">
          <h2 className="introduction-header">It's more than work. It's a way of working together.</h2>
          <p className="introduction">
            Start with a Tusk board, lists, and cards. Customize and expand with more features as your teamwork grows.
            Manage projects, organize tasks, and build team spirit—all in one place.
          </p>
          <div className="demo-img-container">
            <img src={imgDemo} alt="demo" />
          </div>
        </section>
      </section>
    </section>
  )
}
