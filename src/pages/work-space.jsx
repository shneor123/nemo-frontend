import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoardList } from "../cmps/work-space/board-list"
import { loadBoards, updateBoard } from '../store/actions/board.action'
import { Loader } from '../cmps/general/loader'
import { AppNav } from '../cmps/work-space/app-nav'
import { boardService } from '../services/board/board.service'
import { userService } from '../services/basic/user.service'


export const WorkSpace = () => {
  const { boards } = useSelector((storeState) => storeState.boardModule)
  const [recentlyViewedBoards, setRecentlyViewedBoards] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    // loadRecentlyViewedBoards(); 
    onLoadBoards()
  }, [])

  const onLoadBoards = () => {
    dispatch(loadBoards());
  }
  const loadRecentlyViewedBoards = () => {
    const recentlyViewed = boards.filter(board => board.lastViewedAt && (Date.now() - board.lastViewedAt) < 24 * 60 * 60 * 1000);
    setRecentlyViewedBoards(recentlyViewed);
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

    // if (!boards) return <Loader />
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
            {/* <section className="starred-boards-section">
            <div className="title-header flex">
              <div className="title-header-icon-container ">
                <span className='trellicons icon-clock large top'></span>
              </div>
              <h3>Recently viewed</h3>
            </div>
            <div className="primary-boards-container-section">
              <BoardList
                boards={recentlyViewedBoards}
                updateBoard={updateBoard}
                onToggleStar={onToggleStar}
                isStarBoard={true}
              />
            </div>
          </section> */}
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