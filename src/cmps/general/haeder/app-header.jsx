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
  if (isHome) routeClass = "-home"
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
      style={pathname.includes("board") && board?.style?.backgroundColor ? { ...board?.style, filter: "brightness(0.9)" } : {}}
      className={`app-header${routeClass} } ${isScrolled ? 'scrolled' : ''}`}>
      {isHome && (
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
      {!isHome && (
        <nav className='nav-bar'>
          <div className='trello-logo-after-login-container'>
            <div className="logo-continor wobble-top-on-hover" >
              <span onClick={() => navigate("/workspace")} className="fa-brands trello-icon trello-logo-after-login"></span>
              <h1 onClick={() => navigate("/workspace")} className='trello-logo-after-login-title'>Nemo</h1>
            </div>
            <ModalStar />
            {!isHome && (
              <div className="workspace-create" ref={createRef} onClick={(ev) => { onModal('Create Board') }}>
                <span className="share-btn-icon">Create</span>
                <span className="plus trellicons plus-icon"></span> 
              </div>
            )}
          </div>
          <div className="nav-input" ><Search /> </div>

          {!isHome && (
            <div className="user-img-container" ref={profileRef}
              onClick={(ev) => onOpenModal(ev, { category: 'account actions', title: 'Account', element: profileRef.current, props: { user }, })}
            >
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
