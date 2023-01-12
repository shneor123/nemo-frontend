import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import { gapi } from "gapi-script";

import { DynamicModalCmp } from "../../cmps/general/dynamic-modal-cmp"
import { utilService } from "../../services/basic/util.service";
import Logole from "../../assets/img/ttttCapture.PNG"

export const AppHeader = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const { board } = useSelector((storeState) => storeState.boardModule)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const modalDetails = useRef()
  const modalTitle = useRef()

  let routeClass
  let googleUser

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
      const auth2 = gapi?.auth2?.getAuthInstance()
      const profile = auth2?.currentUser?.get().getBasicProfile()
      // googleUser = profile?.getName()
      googleUser = profile?.getImageUrl()
      // console.log(googleUser)
    }
  }, [pathname])
  const auth2 = gapi?.auth2?.getAuthInstance()
  const profile = auth2?.currentUser?.get().getBasicProfile()
  googleUser = profile?.getImageUrl()

  if (pathname === "/") routeClass = "-home"
  if (pathname === "/login" || pathname === "/signup")
    routeClass = "-login-signup"
  if (pathname === "/workspace") routeClass = "-workspace"
  if (pathname.includes("/board")) routeClass = "-workspace"

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
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
            <NavLink to='/login' className='login-btn'>
              Log In
            </NavLink>
            <NavLink to='/signup' className='signup-btn'>
              Sign Up
            </NavLink>
          </div>
        </nav>
      )}

      {pathname !== "/" && (
        <nav className='nav-bar'>
          <div

            className='trello-logo-after-login-container'
          >
            <div className="logo-continor">
              <svg onClick={() => navigate("/")}
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
              <h1 onClick={() => navigate("/")} className='trello-logo-after-login-title'>Nemo</h1>
            </div>
            <NavLink to={"/workspace"} className="workspace-link"> Workspaces </NavLink>
          </div>
          {isModalOpen && (
            <DynamicModalCmp
              modalDetails={modalDetails.current}
              modalTitle={modalTitle.current}
              type={modalTitle}
              user={user}
              onCloseModal={onCloseModal}
            />
          )}
          <div className="user-img-container" onClick={(ev) => { onOpenModal(ev, 'account actions') }}>
            {user &&
              (user?.imgUrl ? (
                <img src={user.imgUrl} className="user-img" alt={utilService.getInitials(user.fullname)} />
              ) : (
                <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
              ))}
            {!user && <span className="user-initial"></span>}
          </div>
        </nav>
      )}
    </header>
  )
}
