import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBoard } from '../../../store/actions/board.action'
import { DynamicFilter } from './dynamic-filter'

export const ModalStar = () => {
  const { boards } = useSelector((storeState) => storeState.boardModule)
  const [modalType, setModal] = useState(null)
  const dispatch = useDispatch()

  let recentBoards = []
  let Boards = []
  let starredBoards

  const onToggleStar = (ev, boardId) => {
    ev.preventDefault()
    const board = boards.find(board => board._id === boardId)
    board.isStar = !board.isStar
    dispatch(updateBoard(board))
  }

  const onToggleModal = (type) => {
    if (modalType === type) setModal(null)
    else setModal(type)
  }

  const sortedBoards = boards.sort((boardA, boardB) => boardB.createdAt - boardA.createdAt)
    ; (() => {
      for (let i = 0; i < 5; i++) {
        recentBoards.push(sortedBoards[i])
      }
      starredBoards = sortedBoards.filter(board => board.isStar)
      starredBoards = [...starredBoards.slice(0, 5)]
    })()
  recentBoards = [...recentBoards]

  const boardsAll = boards.map(board => board)
  return (
    <div className='filter'>
      <button className='boards' onClick={() => onToggleModal('boards')}>
        {modalType === 'boards' &&
          <DynamicFilter
            boards={boardsAll}
            toggleStar={onToggleStar}
            setModal={setModal}
          />
        }
        boards
        <svg viewBox='0 0 20 20'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' /></svg>
      </button>

      <button className='recent' onClick={() => onToggleModal('recent')}>
        {modalType === 'recent' &&
          <DynamicFilter
            boards={recentBoards}
            toggleStar={onToggleStar}
            setModal={setModal}
          />
        }
        Recent
        <svg viewBox='0 0 20 20'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' /></svg>
      </button>

      <button className='stared' onClick={() => onToggleModal('starred')}>
        {modalType === 'starred' &&
          <DynamicFilter
            boards={starredBoards}
            toggleStar={onToggleStar}
            setModal={setModal} />
        }
        Stared
        <svg viewBox='0 0 20 20'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' /></svg>
      </button>
    </div>
  )
}

