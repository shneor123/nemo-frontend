import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoardList } from "../cmps/work-space/board-list"
import { loadBoards, updateBoard } from '../store/actions/board.action'
import { Loader } from '../cmps/general/loader'
import { AppNav } from '../cmps/work-space/app-nav'


export const WorkSpace = () => {
  const { boards } = useSelector((storeState) => storeState.boardModule)
  const dispatch = useDispatch()

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
                <span className='trellicons star large top'></span>

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
                <span className='trellicons icon-template-board large top'></span>
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
      <div className="workspace-app-nav"> <AppNav /> </div>
    </div >
  )
}