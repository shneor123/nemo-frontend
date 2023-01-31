import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../../hooks/useForm'
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { useNavigate } from 'react-router'

export const Search = () => {
    const { boards } = useSelector(({ boardModule }) => boardModule)
    const [boardsSearched, handleSearch] = useForm('')
    const navigate = useNavigate()
    const inputRef = useRef()

    let filteredBoards

    const handleSearchChange = (ev) => {
        handleSearch(ev)
    }

    const onChooseBoard = () => {
        handleSearch({ target: { name: 'search', value: '' } })
        inputRef.value = null
    }

    const onGoTo = (boardId) => {
        navigate(`/board/${boardId}`)
        onChooseBoard(false)
    }

    (() => {
        if (boardsSearched.search) {
            filteredBoards = boards.filter(board => board.title.includes(boardsSearched.search))
        }
    })()


    return (
        <div className='search flex align-center'>
            <svg viewBox='0 0 24 24' ><path fillRule='evenodd' clipRule='evenodd' d='M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z' /></svg>
            <input type='text' ref={inputRef}
                name='search'
                autoComplete='off'
                placeholder='Search'
                onBlur={(ev) => ev.target.value = ''}
                onChange={handleSearchChange}
            />
            {boardsSearched.search && filteredBoards.length !== 0 &&
                <ul className='dynamic-filter-search'>
                    {filteredBoards && filteredBoards.map(board => {
                        return <li key={board._id} className='filter-item' onClick={() => onGoTo(board._id)}>
                            <div style={{
                                background: board.style.background ? `${board.style.background}` : `url(${board.style.bgImg
                                    ? `${board.style.bgImg}` : `${board.style.imgUrl}`})center center / cover`, backgroundColor: `${board.style.backgroundColor}`
                            }}></div>
                            <p>{board.title}</p>
                            <div className={`star-wrapper ${board.isStar ? 'starred' : 'no-starred'}`}>
                                {board.isStar ? <TiStarFullOutline className="star-icon star" /> : <TiStarOutline className="star-icon" />}
                            </div>
                        </li>
                    })}
                </ul>
            }
        </div>
    )
}                              