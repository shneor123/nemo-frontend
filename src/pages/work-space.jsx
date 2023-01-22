import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BoardList } from "../cmps/work-space/board-list.jsx";
import { loadBoards, updateBoard } from '../store/actions/board.action'

import { TiStarOutline } from "react-icons/ti";
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Loader } from '../cmps/general/loader';


export const WorkSpace = () => {
  const dispatch = useDispatch()
  const { boards } = useSelector((storeState) => storeState.boardModule)

  useEffect(() => {
    onLoadBoards()
  }, [])

  const onLoadBoards = () => {
    dispatch(loadBoards())
  }

  const getStarredBoards = () => {
    const starredBoards = boards.filter(board => board && board.isStar)
    return starredBoards
  }

  const onToggleStar = (ev, boardId) => {
    ev.preventDefault()
    const board = boards.find(board => board._id === boardId)
    board.isStar = !board.isStar
    dispatch(updateBoard(board))
  }
  if (!boards) return <Loader />
  return (
    <div className="workspace-page ">
      <section className="all-boards-list">
        <div className="content-all-boards">
          <section className="starred-boards-section">
            <div className="title-header flex">
              <div className="title-header-icon-container">
                <TiStarOutline className="header-icon star-icon" />
              </div>
              <h3>Starred boards</h3>
            </div>
            <div className="primary-boards-container-section">
              <BoardList
                boards={getStarredBoards()}
                updateBoard={updateBoard}
                onToggleStar={onToggleStar}
                isStarBoard={true}
              />
            </div>
          </section>
          <section className="recent-boards-section">

            <div className="title-header flex">
              <div className="title-header-icon-container">
                <AiOutlineClockCircle className="header-icon star-icon" />
              </div>
              <h3>Your Workspace</h3>
            </div>
            <div className="primary-boards-container-section ">
              <div className='board-list-container'>
              </div>
              <BoardList
                boards={boards}
                updateBoard={updateBoard}
                onToggleStar={onToggleStar}
              />
            </div>
          </section>
        </div>
      </section>

    </div >
  )
}