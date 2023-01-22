import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { DynamicFilter } from './dynamic-filter'

export const Search = () => {
    const { boards } = useSelector(({ boardModule }) => boardModule)
    const [boardsSearched, handleSearch] = useForm('')
    const inputRef = useRef()
    let filteredBoards

    const handleSearchChange = (ev) => {
        handleSearch(ev)
    }

    const onChooseBoard = () => {
        handleSearch({ target: { name: 'search', value: '' } })
        inputRef.value = null
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
            {boardsSearched.search &&
                filteredBoards.length !== 0 &&
                <DynamicFilter boards={filteredBoards} setModal={onChooseBoard} />}

        </div>
    )
}