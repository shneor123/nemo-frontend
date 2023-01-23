import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import { gapi } from "gapi-script";

import { utilService } from "../../../services/basic/util.service";
import { setModal } from "../../../store/actions/app.actions";
import { Search } from "./search";
import { ModalStar } from "./modal-star";

import Logole from "../../../assets/img/ttttCapture.PNG"

export const AppHeader = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const { board } = useSelector((storeState) => storeState.boardModule)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileRef = useRef()
  const createRef = useRef()
  const searchRef = useRef()
  let googleUser
  let routeClass

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
      const auth2 = gapi?.auth2?.getAuthInstance()
      const profile = auth2?.currentUser?.get().getBasicProfile()
      googleUser = profile?.getName()
      // googleUser = profile?.getImageUrl()
    }
  }, [pathname])

  const isHome = pathname === '/'
  useEffect(() => {
    if (isHome) window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [isHome])

  const checkScroll = () => {
    if (window.pageYOffset > 0) return setIsScrolled(true)
    setIsScrolled(false)
  }
  if (pathname === "/") routeClass = "-home"
  if (pathname === "/login" || pathname === "/signup") routeClass = "-login-signup"
  if (pathname === "/workspace") routeClass = "-workspace"
  if (pathname.includes("/board")) routeClass = "-workspace"
  if (window.pageYOffset > 0) routeClass += ' scrolled'

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }
  const onModal = (category) => {
    dispatch(
      setModal({
        element: createRef.current,
        category,
        title: category,
        position: utilService.getPosition(createRef.current),
      })
    )
  }

  return (
    <header
      style={
        pathname.includes("board") && board?.style?.backgroundColor
          ? { ...board?.style, filter: "brightness(0.9)" }
          : {}
      }
      className={`app-header${routeClass} } ${isScrolled ? 'scrolled' : ''}`}>
      {pathname === "/" && (
        <nav className='nav-bar flex justify-between align-center'>
          <div className='logo-container'>
            <img className='logo-img-home' src={Logole} alt='' />
            <span className='logo-title-home'>Nemo</span>
          </div>
          <div className='nav-menu'>
            <NavLink to='/login' className='login-btn'> Log In </NavLink>
            <NavLink to='/signup' className='signup-btn'> Sign Up </NavLink>
          </div>
        </nav>
      )
      }
      {
        pathname !== "/" && (
          <nav className='nav-bar'>
            <div className='trello-logo-after-login-container'>
              <div className="logo-continor wobble-top-on-hover" >
                <svg onClick={() => navigate("/")} className='trello-logo-after-login'
                  stroke='currentColor' fill='currentColor' strokeWidth='0' version='1.1' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM7 12c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-8c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v8zM13 9c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-5c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v5z'></path>
                </svg>
                <h1 onClick={() => navigate("/")} className='trello-logo-after-login-title'>Nemo</h1>
              </div>

              <NavLink to={"/workspace"} className="workspace-link"> Workspaces </NavLink>
              <ModalStar />
              {!isHome && (
                <div className="workspace-create" ref={createRef}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    onModal('Create')
                  }}>Create</div>
              )}
            </div>

            <div className="nav-input" ><Search /> </div>

            {!isHome && (
              <div className="user-img-container" ref={profileRef}
                onClick={(ev) =>
                  onOpenModal(ev, {
                    category: 'account actions',
                    title: 'Account',
                    element: profileRef.current,
                    props: { user },
                  })}>


                {user &&
                  (user?.imgUrl ? (
                    <img src={user.imgUrl} className="user-img" alt={utilService.getInitials(user.fullname)} />
                  ) : (
                    <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
                  ))}
                {!user && <span className="user-initial"></span>}
              </div>
            )}

          </nav>
        )
      }
    </header >
  )
}
