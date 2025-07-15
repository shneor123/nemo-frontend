import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import classNames from "classnames";

import { utilService } from "../../../services/basic/util.service";
import { setModal } from "../../../store/actions/app.actions";
import { Search } from "./search";
import { ModalStar } from "./modal-star";

import Logole from "../../../assets/img/ttttCapture.PNG";

export const AppHeader = ({ changeThemeRef, setPreviewEndTrue, setPreviewEndFalse }) => {
  const { user } = useSelector((storeState) => storeState.userModule);
  const { board } = useSelector((storeState) => storeState.boardModule);

  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileRef = useRef();
  const createRef = useRef();

  useEffect(() => {
    if (isHome()) {
      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (!isHome() && pathname !== "/login" && pathname !== "/signup") {
      const auth2 = gapi?.auth2?.getAuthInstance();
      const profile = auth2?.currentUser?.get()?.getBasicProfile();
      if (profile) {
        console.log("Google User:", profile.getName());
      }
    }
  }, [pathname]);

  const isHome = () => pathname === "/";

  const checkScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  const getRouteClass = () => {
    if (isHome()) return "app-header-home";
    if (pathname === "/login" || pathname === "/signup") return "app-header-login-signup";
    if (pathname === "/workspace" || pathname.includes("/board") || pathname.includes("/users")) {
      return "app-header-workspace";
    }
    return "";
  };

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal));
  };

  const onModal = (category) => {
    dispatch(
      setModal({
        element: createRef.current,
        category,
        title: category,
        position: utilService.getPosition(createRef.current),
      })
    );
  };

  const headerClass = classNames(
    "app-header",
    getRouteClass(),
    { scrolled: isScrolled }
  );

  return (
    <header
      style={
        pathname.includes("board") && board?.style?.backgroundColor
          ? { ...board?.style, filter: "brightness(0.9)" }
          : {}
      }
      className={headerClass}
    >
      {isHome() ? (
        <nav className="nav-bar flex justify-between align-center">
          <div className="logo-container">
            <img className="logo-img-home" src={Logole} alt="logo" />
            <span className="logo-title-home">Nemo</span>
          </div>
          <div className="nav-menu">
            <NavLink to="/login" className="login-btn">
              Log In
            </NavLink>
            <NavLink to="/signup" className="signup-btn">
              Sign Up
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className="nav-bar">
          <div className="trello-logo-after-login-container">
            <div
              className="logo-continor"
              onClick={() => navigate("/workspace")}
            >
              <span className="fa-brands trello-icon trello-logo-after-login"></span>
              <h1 className="trello-logo-after-login-title">Nemo</h1>
            </div>

            <ModalStar />

            <div
              className="workspace-create"
              ref={createRef}
              onClick={(ev) => onModal("Create Board")}
            >
              <span title="Create" className="share-btn-icon">
                Create
              </span>
              <span className="plus trellicons plus-icon">+</span>
            </div>
          </div>

          <div className="nav-input" title="Search">
            <Search />
          </div>

          <span
            title="Theme"
            ref={changeThemeRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: changeThemeRef.current,
                category: "Theme",
                title: "Theme",
                props: { changeThemeRef, setPreviewEndTrue, setPreviewEndFalse },
              })
            }
          >
            <div className="icon-theme"></div>
          </span>

          <span className="git-link" title="Information">
            <a href="https://github.com/shneor123/nemo-frontend" target="_blank" rel="noreferrer">
              <span className="trello-home question-icon"></span>
            </a>
          </span>

          <div
            className="user-img-container"
            title="Account"
            ref={profileRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                category: "account actions",
                title: "Account",
                element: profileRef.current,
                props: { user },
              })
            }
          >
            {user?.imgUrl ? (
              <img
                src={user.imgUrl}
                className="user-img"
                alt={utilService.getInitials(user.fullname)}
              />
            ) : (
              <span className="user-initial">
                {user ? utilService.getInitials(user.fullname) : ""}
              </span>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
