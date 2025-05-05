import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

import { gapi } from "gapi-script";
import { login, signup } from "../store/actions/user.actions";
import { useForm } from "../hooks/useForm";

import leftHero from "../assets/svg/leftHero.svg";
import rightHero from "../assets/svg/rightHero.svg";
import guest from "../assets/svg/guest.svg";

export const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const searchParams = new URLSearchParams(location.search);
  const emailFromUrl = searchParams.get("email") || "";

  const [isSignup, setIsSignup] = useState(false);
  const [credentials, handleChange, setCredentials] = useForm({
    username: emailFromUrl,
    password: "",
    fullname: "",
    imgUrl: "",
  });

  useEffect(() => {
    onIsSignup();
  }, [pathname]);

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: "UU3HN_fAmdAcd03JKanAqIk2a7qmRBK1YpSpETtTscI",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onIsSignup = () => {
    setIsSignup(pathname === "/signup");
  };

  const onSignUp = (ev) => {
    ev?.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname) return;
    dispatch(signup(credentials));
    setCredentials({ username: "", password: "", fullname: "", imgUrl: "" });
    navigate("/workspace");
  };

  const onLogin = (ev) => {
    ev?.preventDefault();
    if (!credentials.username) return;
    dispatch(login(credentials));
    navigate("/workspace");
  };

  return (
    <section className="login-page flex column">
      <header className="login-header">
        <h1>Nemo</h1>
      </header>

      <div className="login-signup-container">
        <form className="flex column" onSubmit={isSignup ? onSignUp : onLogin} autoComplete="off">
          {isSignup ? (
            <>
              <h1>Sign up for your account</h1>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter full name"
                value={credentials.fullname}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="text"
                id="upload-file-url"
                name="imgUrl"
                placeholder="Enter link img profile"
                value={credentials.imgUrl}
                onChange={handleChange}
                autoComplete="off"
              />
            </>
          ) : (
            <h1>Login to Nemo</h1>
          )}

          <input
            type="email"
            id="username"
            name="username"
            placeholder="Enter email"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <button className={`logbtn ${isSignup ? "signup" : "login"}`}>
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <div className="more-opt flex column align-center">
          <span>OR</span>
          <button onClick={() => navigate("/workspace")}>
            <img src={guest} className="guest-icon" />
            <p>Continue as Guest</p>
          </button>
        </div>

        <hr />

        <div className="dif-choice flex">
          <Link to="/">Back Home</Link>
          {isSignup ? (
            <Link to="/login">Log In</Link>
          ) : (
            <Link to="/signup">Sign up for an account</Link>
          )}
        </div>
      </div>

      <img className="left-hero" src={leftHero} />
      <img className="right-hero" src={rightHero} />
    </section>
  );
};
