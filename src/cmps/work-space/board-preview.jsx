import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { removeBoard } from "../../store/actions/board.action";
import { Loader } from "../general/loader";

export function BoardPreview({ board, onToggleStar }) {
  const dispatch = useDispatch()

  const onRemoveTask = (ev) => {
    ev.stopPropagation()
    dispatch(removeBoard(board.id))
  }
  if (!board) return <Loader />

  return (
    <div>
      <Link to={`/board/${board._id}`}>
        <div className="board-preview-container"
          style={{
            background: board.style.background
              ? `${board.style.background}`
              : `url(${board.style.bgImg})center center / cover`, backgroundColor: `${board.style.backgroundColor}`
          }}>
          <h3>{board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}</h3>
          <span className="starred-container">
            {(board.isStar) ?
              <TiStarFullOutline className="star-icon star" onClick={ev => onToggleStar(ev, board._id)} /> :
              <TiStarOutline className="star-icon" onClick={ev => onToggleStar(ev, board._id)} />
            }
          </span>
        </div>
      </Link >
      {/* <button className="remove_board" onClick={onRemoveTask}>Delete</button>  */}
    </div >
  )
}

