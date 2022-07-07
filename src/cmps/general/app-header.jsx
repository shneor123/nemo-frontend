import {  useLocation } from "react-router-dom";
import Logole from "../../assets/img/ttttCapture.PNG";
import { useDispatch, useSelector } from "react-redux";
import {  onLogout } from "../../store/actions/user.actions";
import { useNavigate } from "react-router";

export const AppHeader = () => {
  const { pathname } = useLocation();
  const {user} = useSelector((storeState) => storeState.userModule)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let routeClass = "";

  // customized transparent
  if (pathname === "/") routeClass = "-home";
  if (pathname === "/login" || pathname === "/signup")
    routeClass = "-login-signup";
  if (pathname === "/workspace") routeClass = "-workspace";
  // later will come dynamically with api
  if (pathname.includes("/board")) routeClass = "-workspace";
  
  const onUserLogout = () => {
    dispatch(onLogout())
    navigate('/login')
  }

  return (
    <header style={(pathname.includes("board")) ? {backgroundColor:'#0d295886'} : {}} className={`app-header${routeClass}`}>
    {pathname === "/" && (
      <nav className="nav-bar flex justify-between align-center">
        <div className="logo-container">
          <img className="logo-img-home" src={Logole} alt="" />
          <span className="logo-title-home">Nemo</span>
        </div>
        <div className="nav-menu">
          <a href="/login" className="login-btn">
            Log In
          </a>
          <a href="/signup" className="signup-btn">
            Sign Up
          </a>
        </div>
      </nav>
    )}

    {pathname !== "/" && (
      <nav className="nav-bar">
        {/* <button onClick={onUserLogout}>logout</button> */}
        
        <div onClick={() => navigate('/workspace')} className="trello-logo-after-login-container" >
        <svg className="trello-logo-after-login" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM7 12c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-8c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v8zM13 9c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-5c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v5z"></path></svg>
        <h1 className="trello-logo-after-login-title">Nemo</h1>
        </div>
        {/* <span>hello {user?.username || 'guest'}</span> */}
        {/* implement guest feature if no user logged in */}
        <div style={{background: `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover ` }} className="user-avatar"></div>
      </nav>
    )}
  </header>
  );
};
