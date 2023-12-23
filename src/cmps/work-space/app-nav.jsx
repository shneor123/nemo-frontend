import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { boardService } from '../../services/board/board.service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const AppNav = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch()

    const updateAllBoardsPublicStatus = async () => {
        const updatedIsPublic = !isPublic;
        const allBoards = await boardService.query();
        if (updatedIsPublic) {
            dispatch({ type: 'SET_BOARDS', boards: allBoards });
        } else {
            const filteredBoards = allBoards.filter(board => {
                return board.createdBy._id === user._id || board.members.some(member => member._id === user._id);
            });
            dispatch({ type: 'SET_BOARDS', boards: filteredBoards });
        }
        setIsPublic(updatedIsPublic);
    };

    return (
        <section className="app-nav-container">
            <nav>
                <div className="boards-container gap">
                    <NavLink to={'/workspace'} className="btn home-btn align-center gap20">
                        <span className="trellicons icon-board"></span>
                        <span>Boards</span>
                    </NavLink>

                    <NavLink to={'/'} className="btn home-btn align-center gap20">
                        <span className="trellicons icon-home"></span>
                        <span>Home</span>
                    </NavLink>
                    <hr className='hr' />
                    <span style={{ fontSize: 12, marginLeft: 12 }}>Workspaces</span>
                    {user && user.fullname !== 'Guest' && (
                        <span style={{ fontSize: 12, marginLeft: 12 }} className="btn home-btn align-center gap20" onClick={updateAllBoardsPublicStatus}>
                            {isPublic ? 'Show Less Boards' : 'Show All Boards'}
                        </span>
                    )}

                </div >
            </nav >
        </section >
    )
}
