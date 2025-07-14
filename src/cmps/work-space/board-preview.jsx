import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import { removeBoard, updateBoard } from "../../store/actions/board.action";
import { Loader } from "../general/loader";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";


export function BoardPreview({ board, onToggleStar ,updateBoard}) {
  const dispatch = useDispatch();
  const { user } = useSelector((storeState) => storeState.userModule)

  const updateLastViewedAt = (ev,board) => {
    board.lastViewedAt = Date.now()
    dispatch(updateBoard(...board))
  };
  const onRemoveTask = (ev) => {
    dispatch(removeBoard(board._id))
  };

  if (!board.style) return <Loader />;
  return (
    <div>
      {user.isAdmin && (
        <button onClick={() => onRemoveTask(board._id)}>
          <FaTrash />
        </button>
      )}
      <Link to={`/board/${board._id}`}>
        <section className="board-preview-container" 
        // onClick={(ev) => updateLastViewedAt(ev, board)}
          style={{
            background: board.style.background
              ? `${board.style.background}`
              : `url(${board.style.bgImg
                ? `${board.style.bgImg}`
                : `${board.style.imgUrl}`})center center / cover`,
            backgroundColor: `${board.style.backgroundColor}`,
          }}
        >
          <div className="board-icon"></div>
          {board.isStar ? (
            <TiStarFullOutline className="fa-solid star-icon" onClick={(ev) => onToggleStar(ev, board._id)} />
          ) : (
            <span className="trellicons star" onClick={(ev) => onToggleStar(ev, board._id)}></span>
          )}
          <div className="board-title"> {board.title && board.title.length > 20 ? board.title.substring(0, 20) + "..." : board.title} </div>
        </section>
      </Link>
    </div>
  );
}

