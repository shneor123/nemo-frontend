import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setModal } from '../../store/actions/app.actions'

export const SideManuBoard = ({ board, boardId, boards }) => {
  const [navIsHidden, setNavIsHidden] = useState(true)
  const dispatch = useDispatch()
  const membersRef = useRef()
  const addRef = useRef()

  const onModal = (e) => {
    e.stopPropagation()
    dispatch(setModal({
      element: addRef.current,
      category: 'Create Board',
      title: 'Create Board"',
    })
    )
  }

  const onModalMember = (e) => {
    e.stopPropagation()
    dispatch(setModal({
      element: membersRef.current,
      category: 'Members side',
      title: 'Members side',
      props: { element: membersRef.current, board },

    }))
  }

  return (
    <section className={`board-nav flex column ${navIsHidden ? "navIsHidden" : ""}`}>
      <div className="nav-title flex row align-center justify-between" >
        <span>Workspace</span>
        <div className="btn-regular btn-toggle" onClick={() => setNavIsHidden(!navIsHidden)}  >
          <span className="fa-solid arrow-icon"></span>
        </div>
      </div >

      <NavLink to={'/workspace'} className="btn-nav flex align-center" >
        <span className="trello-home trello-icon"></span>
        <span> Boards</span>
      </NavLink >

      <div className="btn-nav flex align-center" ref={membersRef} onClick={onModalMember}>
        <span className="trello-home join-icon"></span>
        <span> Members</span>
      </div >

      <div className="nav-title flex row align-center justify-between ">
        <span>Your Boards</span>
        <div className="btn-regular" ref={addRef} onClick={onModal}>
          <span className="fa-regular plus-icon"></span>
        </div>
      </div >

      <div className="boards-container">
        {boards.map(board => {
          return (
    <div key={board._id}>
      <Link to={`/board/${board._id}`} className={`btn-nav ${boardId === board._id ? 'isClicked' : ''}`}>
               {/* <div className="board-icon"
                  style={{
                    background: board.style.background
                      ? `${board.style.background}`
                      : `url(${board.style.bgImg
                        ? `${board.style.bgImg}`
                        : `${board.style.imgUrl}`})center center / cover`,
                    backgroundColor: `${board.style.backgroundColor}`
                  }}
                  >  */}
                <div className="board-icon"
                  style={{
                    background: board.style
                      ? board.style.background
                        ? `${board.style.background}`
                        : board.style.bgImg
                          ? `url(${board.style.bgImg}) center center / cover`
                          : board.style.imgUrl
                            ? `url(${board.style.imgUrl}) center center / cover`
                            : 'none'
                      : 'none',
                    backgroundColor: board.style ? `${board.style.backgroundColor}` : 'transparent'
                  }}
                >
                </div>
                <div className="board-icon"></div>
                <span>{board.title}</span>
              </Link >
            </div>
          )
        })}
      </div >
    </section >
  )
}

