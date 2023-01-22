import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppNav = () => {
    return (
        <section className="app-nav-container">

            <nav>
                <div className="boards-container flex column gap">
                    <NavLink to={'/workspace'} className="btn home-btn flex align-center gap20">
                        <span className="trellicons icon-board"></span>
                        <span>Boards</span>
                    </NavLink>

                    <NavLink to={'/'} className="btn home-btn flex align-center gap20">
                        <span className="trellicons icon-home"></span>
                        <span>Home</span>
                    </NavLink>
                </div >

                <div className="workspaces-container">

                </div>
            </nav >
        </section >
    )
}
