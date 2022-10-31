import { Link, useLocation, useParams } from "react-router-dom"
import { ReactComponent as HomeLogo } from "../../assets/svg/homePageLogo.svg"
import Logole from "../../assets/img/ttttCapture.PNG"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, onLogout } from "../../store/actions/user.actions"
import { userService } from "../../services/user.service"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { gapi } from "gapi-script";


export const AppHeader = () => {
  const { pathname } = useLocation()
  const { user } = useSelector((storeState) => storeState.userModule)
  const { board } = useSelector((storeState) => storeState.boardModule)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let routeClass
  let googleUser

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
      const auth2 = gapi?.auth2?.getAuthInstance()
      const profile = auth2?.currentUser?.get().getBasicProfile()
      googleUser = profile?.getName()
      console.log(googleUser);
    }
  }, [pathname])

  if (pathname === "/") routeClass = "-home"
  if (pathname === "/login" || pathname === "/signup")
    routeClass = "-login-signup"
  if (pathname === "/workspace") routeClass = "-workspace"
  if (pathname.includes("/board")) routeClass = "-workspace"

  const onUserLogout = () => {
    dispatch(onLogout())
    navigate("/login")
  }

  return (
    <header
      style={
        pathname.includes("board") && board?.style?.backgroundColor
          ? { ...board?.style, filter: "brightness(0.9)" }
          : {}
      }
      className={`app-header${routeClass}`}
    >
      {pathname === "/" && (
        <nav className='nav-bar flex justify-between align-center'>
          <div className='logo-container'>
            <img className='logo-img-home' src={Logole} alt='' />
            <span className='logo-title-home'>Nemo</span>
          </div>
          <div className='nav-menu'>
            <a href='/login' className='login-btn'>
              Log In
            </a>
            <a href='/signup' className='signup-btn'>
              Sign Up
            </a>
          </div>
        </nav>
      )}

      {pathname !== "/" && (
        <nav className='nav-bar'>
          {/* <button onClick={onUserLogout}>logout</button> */}

          <div
            onClick={() => navigate("/workspace")}
            className='trello-logo-after-login-container'
          >
            <svg
              className='trello-logo-after-login'
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              version='1.1'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM7 12c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-8c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v8zM13 9c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-5c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v5z'></path>
            </svg>
            <h1 className='trello-logo-after-login-title'>Nemo</h1>
          </div>
          {/* <span>hello {user?.username || 'guest'}</span> */}
          {/* implement guest feature if no user logged in */}
          <div
            style={{
              background: `url(${user?.imgUrl}) center center / cover `,
            }}
            className='user-avatar'
          ></div>
        </nav>
      )}
    </header>
  )
}
