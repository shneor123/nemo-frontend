import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

export const DynamicFilter = ({ modalType, boards, setModal, toggleStar }) => {
    const navigate = useNavigate()

    const onGoTo = (boardId) => {
        navigate(`/board/${boardId}`)
        setModal(false)
    }

    return (
        <ul className='dynamic-filter'>
            <p className='empty-star'>{modalType === 'starred' && boards.length === 0 ? 'Star important boards to access them quickly and easily.' : ''}</p>
            {boards.map(board => {
                return <li key={board._id} className='filter-item' onClick={() => onGoTo(board._id)}>
                    <div style={{
                            background: board.style.background
                                ? `${board.style.background}`
                                : `url(${board.style.bgImg
                                    ? `${board.style.bgImg}`
                                    : `${board.style.imgUrl}`})center center / cover`,
                            backgroundColor: `${board.style.backgroundColor}`
                        }}></div>


                    <p>{board.title}</p>
                    <div className={`star-wrapper ${board.isStar ? 'starred' : 'no-starred'}`}>
                        {(board.isStar)
                            ? <TiStarFullOutline className="star-icon star" onClick={ev => toggleStar(ev, board._id)} />
                            : <TiStarOutline className="star-icon" onClick={ev => toggleStar(ev, board._id)} />
                        }
                    </div>
                </li>
            })}
        </ul>
    )
}