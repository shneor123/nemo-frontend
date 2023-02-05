import React from "react"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { TiStarFullOutline } from "react-icons/ti"
import { removeBoard } from "../../store/actions/board.action"
import { Loader } from "../general/loader"

export function BoardPreview({ board, onToggleStar }) {
  const dispatch = useDispatch()

  const onRemoveTask = (ev) => {
    ev.stopPropagation()
    dispatch(removeBoard(board.id))
  }
  if (!board.style) return <Loader />
  return (
    <div>
      <Link to={`/board/${board._id}`}>
        <section className="board-preview-container"
          style={{
            background: board.style.background
              ? `${board.style.background}`
              : `url(${board.style.bgImg
                ? `${board.style.bgImg}`
                : `${board.style.imgUrl}`})center center / cover`,
            backgroundColor: `${board.style.backgroundColor}`
          }}>
          <div className="board-icon"></div>
          {(board.isStar)
            ? <TiStarFullOutline className="fa-solid star-icon" onClick={ev => onToggleStar(ev, board._id)} />
            : <span className="trellicons star" onClick={ev => onToggleStar(ev, board._id)}></span>
          }
          <div className="board-title">{board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}</div>
        </section>
      </Link >
    </div >
  )
}

