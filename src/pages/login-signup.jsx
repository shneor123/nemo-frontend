import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import leftHero from "../assets/svg/leftHero.svg";
import rightHero from "../assets/svg/rightHero.svg";
import guest from "../assets/svg/guest.svg";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/user.actions";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { LoginWithGoogle } from '../cmps/login/LoginGoogle';

export const LoginSignup = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((storeState) => storeState.userModule)


  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onIsSignup();
    clearState();
  }, [pathname]);

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "" });
  };

  const onIsSignup = () => {
    if (pathname === "/signup") setIsSignup(true);
    else setIsSignup(false);
  };

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  const onSignUp = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return;
    dispatch(signup(credentials));
    clearState();
  };

  const onLogin = (ev) => {
    if (ev) ev.preventDefault();
    if (!credentials.username) return;
    dispatch(login(credentials));
    clearState();
    navigate("/workspace");
  };

  const onLoginGoogle = async (googleData) => {
    try {
      const res = await fetch('/api/google-login', {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.tokenId,
          googleId: googleData.googleId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await res.json()
      dispatch(signup({
        username: result.email, password: result.googleId,
        fullname: result.name, imgUrl: result.picture, googleId: result.googleId
      }));
      props.history.push('/workspace');
    } catch (err) {
      console.log('Cannot login', err);
    }

  }

  return (
    <section className="login-page flex column">
      <header className="login-header">
        <h1>Nemo</h1>{" "}
      </header>
      <div className="login-signup-container">
        <form className="flex column " onSubmit={isSignup ? onSignUp : onLogin}>
          {isSignup ? (
            <>
              {" "}
              <h1>Sign up for your account</h1>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter full name"
                value={credentials.fullname}
                onChange={handleChange}
              />
            </>
          ) : (
            <h1>Login to Nemo</h1>
          )}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button className={`logbtn ${isSignup ? "signup" : "login"}`}>
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <div className="more-opt flex column align-center ">
          <span>OR</span>
          <button>
            <Link className="link-btn" to={`/workspace`}>
              <img src={guest} className="guest-icon" />
              <p>Continue as Guest</p>{" "}</Link>
          </button>
          <button>
              <LoginWithGoogle onLoginGoogle={onLoginGoogle} />
          </button>
        </div>
        <hr />
        <div className="dif-choice flex">
          <Link to="/">Back Home</Link>
          {isSignup ? (
            <Link to="/login"> Log In</Link>
          ) : (
            <Link to="/signup"> Sign up for an account</Link>
          )}
        </div>
      </div>
      <img className="left-hero" src={leftHero} />
      <img className="right-hero" src={rightHero} />
    </section>
  );
};
