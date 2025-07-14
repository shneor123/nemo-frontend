import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { setModal } from '../../../store/actions/app.actions'

export const SearchModal = () => {
    const { boards } = useSelector(({ boardModule }) => boardModule)
    const [filterBoards, setFilterBoards] = useState(boards)
    const [boardsSearched, setBoardsSearched] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onGoTo = (boardId) => {
        navigate(`/board/${boardId}`)
        dispatch(setModal(null))
    }

    const handleChange = ({ target }) => {
        setBoardsSearched(target.value)
        setFilterBoards(
            boards.filter((board) =>
                board.title.toLowerCase().includes(target.value.toLowerCase()))
        )
    }

    return (
        <div className='search'>
            <input type="text" className="search-input-header" autoComplete='off' placeholder='Search' value={boardsSearched} onChange={handleChange} />
            <div class="title">{boards.length > 1 ? "RECENT BOARDS" : "NO RESULTS"}</div>

            <ul className='dynamic-filter scrollable-content'>
                {filterBoards && filterBoards.map(board => {
                    return <li key={board._id} className='filter-item' onClick={() => onGoTo(board._id)}>
                        <div style={{
                            background: board.style.background ? `${board.style.background}` : `url(${board.style.bgImg
                                ? `${board.style.bgImg}` : `${board.style.imgUrl}`})center center / cover`, backgroundColor: `${board.style.backgroundColor}`
                        }}></div>
                        <p style={{ marginLeft: '10px', marginTop: '10px' }}>{board.title}</p>

                        <div className={`star-wrapper ${board.isStar ? 'starred' : 'no-starred'}`}>
                            {board.isStar ? <TiStarFullOutline className="star-icon star" /> : <TiStarOutline className="star-icon" />}
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}                              