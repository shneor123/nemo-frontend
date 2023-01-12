import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"

import { gapi } from "gapi-script"
import { LoginWithGoogle } from "../login/LoginGoogle"
import { CLIENT_ID } from '../.secret/api'

import { login, signup } from "../store/actions/user.actions"
import { useForm } from "../hooks/useForm"
import leftHero from "../assets/svg/leftHero.svg"
import rightHero from "../assets/svg/rightHero.svg"
import guest from "../assets/svg/guest.svg"


export const LoginSignup = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const [isSignup, setIsSignup] = useState(false)
  const [credentials, handleChange, setCredentials] = useForm({
    username: "",
    password: "",
    fullname: "",
    imgUrl: ""
  })

  useEffect(() => {
    onIsSignup()
    clearState()
  }, [pathname])

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: CLIENT_ID,
        scope: "",
      })
    }
    gapi.load("client:auth2", start)
  }, [])


  // var accessToken = gapi.auth.getToken().access_token
  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
  }

  const onIsSignup = () => {
    if (pathname === "/signup") setIsSignup(true)
    else setIsSignup(false)
  }

  const onSignUp = (ev = null) => {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    dispatch(signup(credentials))
    clearState()
    navigate('/workspace')
  }

  const onLogin = (ev) => {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    dispatch(login(credentials))
    navigate("/workspace")
  }


  return (
    <section className="login-page flex column">
      <header className="login-header"><h1>Nemo</h1></header>
      <div className="login-signup-container">
        <form className="flex column " onSubmit={isSignup ? onSignUp : onLogin}>
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
              />
              <input
                className="inputAttach"
                type="text"
                id="upload-file-url"
                name="imgUrl"
                placeholder="Enter link img profile"
                value={credentials.imgUrl}
                onChange={handleChange} />
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
            <img src={guest} className="guest-icon" />
            <p onClick={() => navigate('/workspace')}>Continue as Guest</p>{" "}
          </button>
          <LoginWithGoogle />
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
  )
}
