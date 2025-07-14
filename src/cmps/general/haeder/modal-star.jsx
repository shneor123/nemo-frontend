import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '../../../store/actions/app.actions'
import { loadBoards, updateBoard } from '../../../store/actions/board.action'

export const ModalStar = () => {
  const { boards } = useSelector(({ boardModule }) => boardModule)
  const dispatch = useDispatch()
  const recentRef = useRef()
  const starredRef = useRef()

  let recentBoards = []
  let starredBoards


  useEffect(() => {
    dispatch(loadBoards())
  }, [])

  const onToggleStar = (ev, boardId) => {
    ev.preventDefault()
    const board = boards.find(board => board._id === boardId)
    board.isStar = !board.isStar
    dispatch(updateBoard(board))
  }

  const onOpenModalRecent = (e) => {
    e.stopPropagation()
    dispatch(setModal({
      element: recentRef.current,
      category: 'Dynamic filter',
      title: 'Recent boards',
      props: { element: recentRef.current, boards: recentBoards, onToggleStar },
    })
    )
  }
  const onOpenModalStarred = (e) => {
    e.stopPropagation()
    dispatch(setModal({
      element: starredRef.current,
      category: 'Dynamic filter',
      title: 'Starred boards',
      props: { element: starredRef.current, boards: starredBoards, onToggleStar },
    })
    )
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

  const allBoards = boards.map(board => board)

  return (
    <>
      <div className='filter'>
        <button title="Recent" ref={recentRef} onClick={onOpenModalRecent}>
          Recent <span className="fa-solid down-icon"></span>
        </button>
        <button title="Stared" ref={starredRef} onClick={onOpenModalStarred}>
          Stared <span className="fa-solid down-icon"></span>
        </button>
      </div>

      <div className='filter-width'>
        <button ref={recentRef} onClick={onOpenModalRecent}>
          <span className="fa-regular date-icon"></span>
        </button>

        <button ref={starredRef} onClick={onOpenModalStarred}>
          <span className="fa-regular star-icon"></span>
        </button>
      </div>
    </>
  )
}