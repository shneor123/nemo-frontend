import { useRef, useState } from "react"
import { Menu } from "./menu"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { FaEllipsisH } from "react-icons/fa"
import { MdOutlineFilterList } from "react-icons/md"
import { BsPersonPlus } from "react-icons/bs"
import { DynamicModalCmp } from "./dynamic-modal-cmp"
import { useDispatch } from "react-redux"
import { updateBoard } from "../../store/actions/board.action"



export const ToolBar = ({ boardId, board, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  const modalDetails = useRef()
  const modalTitle = useRef()

  const onOpenMenu = () => {
    setIsMenuOpen(true)
  }

  const onCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalDetails.current = ev.target.getBoundingClientRect()
    modalTitle.current = txt
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const onToggleStar = (ev) => {
    ev.preventDefault();
    board.isStar = !board.isStar;
    dispatch(updateBoard(board));
  };

  return (
    <div className="toolbar">

      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle="Invite to board"
          users={users}
          boardMembers={board.members}
          onCloseModal={onCloseModal}
          boardId={boardId}
          board={board}
        />
      )}

      <Menu
        isMenuOpen={isMenuOpen}
        onCloseMenu={onCloseMenu}
        board={board}
        activities={board.activities}
      />

      <div className="toolbar-left">
        <span className="board-toolbar-title-container">
          <h1 className="board-toolbar-title">{board.title}</h1>
        </span>
        <span className="toolbar-btn star-btn">
          {(board.isStar) ?
            <AiFillStar color={"gold"} size={17} className="star-icon starred" onClick={ev => onToggleStar(ev)} /> :
            <AiOutlineStar size={17} className="star-icon" onClick={ev => onToggleStar(ev)} />
          }
        </span>
        <span className="toolbar-divider"></span>

        <div className="toolbar-members">
          {board.members.map((member) => {
            return (
              <div
                key={member._id}
                style={{
                  background: `url(${member?.imgUrl}) center center / cover `
                }}
                className="user-avatar">
              </div>
            )
          })}
        </div>
        <button onClick={(ev) => onOpenModal(ev)} className="share-btn">
          <BsPersonPlus /> Share
        </button>
      </div>
      <div className="toolbar-right">
        <div>
          <span className="toolbar-divider"></span>
          <span onClick={onOpenMenu} className="toolbar-btn toolbar-menu-btn">
            <FaEllipsisH /> <span className="tool-title">Show menu</span>
          </span>
        </div>
      </div>
    </div>
  )
}
