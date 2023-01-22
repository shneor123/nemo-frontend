import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

export const DynamicFilter = ({ boards, setModal, modalType, toggleStar }) => {
    const navigate = useNavigate()

    const onGoTo = (boardId) => {
        navigate(`board/${boardId}`)
        setModal(false)
    }

    return <ul className='dynamic-filter'>
        <h3>{modalType === 'starred' ? 'Starred boards' : 'Recent boards'}</h3>
        {boards.map(board => {
            return <li key={board._id} className='filter-item' onClick={() => onGoTo(board._id)}>
                <div style={{ background: board.style.background ? `${board.style.background}` : `url(${board.style.bgImg})center center / cover`, backgroundColor: `${board.style.backgroundColor}` }}></div>
                <p>{board.title}</p>
                <div onClick={toggleStar} className={`star-wrapper ${board.isStar ? 'starred' : 'no-starred'}`}>
                    {(board.isStar) ? <TiStarFullOutline /> : <TiStarOutline />}
                </div>
            </li>
        })}
    </ul>
}