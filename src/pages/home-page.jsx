import React from "react";
import { Link } from "react-router-dom";
import imgHero from "../assets/img/home-page/home1.jpeg";
import imgDemo from "../assets/img/home-page/white-wave-bg.svg";

export const HomePage = () => {
  return (
    <section className="home-page ">
      <section className="header flex row align-center justify-between"></section>
      <section>
        <img className="wave" src={imgDemo} alt="" />
        <div className="demo-invite flex row align-start w-100 justify-center wrap">
          <div>
            <h1>Nemo brings all your tasks, teammates, and tools together!</h1>
            <p>Keep everything in the same place, even if your team isn't.</p>
            <div className="flex row gap20 justify-center ">
              <Link to={'/workspace'} className="btn-demo">See Demo</Link>
            </div>
          </div>
          <img className="img1" src={imgHero} />
        </div>
      </section>
    </section>

  )
}



// export const HomePage = () => {
//   return (
//     <section className="homepage-container">
//       <section className="homepage-wrapper">
//         <section className="homepage">
//           <div className="homepage-text">
//             <h1 className="homepage-title"> Nemo helps teams move work forward.</h1>
//             <p className="homepage-paragraph">
//               Collaborate, manage projects, and reach new productivity peaks.
//               From high rises to the home office, the way your team works is
//               unique—accomplish it all with Nemo.
//             </p>
//             <Link style={{ all: "unset" }} to={"/workspace"}>
//               <button className="demo-btn">Start Demo</button>
//             </Link>
//           </div>
//           <div className="homepage-hero">
//             <img src={imgHero} alt="" />
//           </div>
//         </section>
//         <section className="app-info">
//           <h2 className="introduction-header">It's more than work. It's a way of working together.</h2>
//           <p className="introduction">
//             Start with a Tusk board, lists, and cards. Customize and expand with more features as your teamwork grows.
//             Manage projects, organize tasks, and build team spirit—all in one place.
//           </p>
//           <div className="demo-img-container">
//             <img src={imgDemo} alt="demo" />
//           </div>
//         </section>
//       </section>
//     </section>
//   )
// } 
