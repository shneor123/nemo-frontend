import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineStar, AiFillStar, AiOutlineDashboard, AiOutlinePlus } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineCreateNewFolder, MdOutlineFilterList } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { Menu } from "./menu";
import { DynamicModalCmp } from "./dynamic-modal-cmp";
import { updateBoard } from "../../store/actions/board.action";
import { useNavigate } from "react-router";
import { MemberPreview } from "../modals/member-preview";


export const ToolBar = ({ boardId, board, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null)
  const [shownMembers, setShownMembers] = useState('4')
  const modalDetails = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dashboardRef = useRef()
  const moreMembersRef = useRef()

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const handleResize = () => {
    if (window.innerWidth < 671) {
      setShownMembers(2)
    } else if (window.innerWidth < 691) {
      setShownMembers(3)
    } else if (window.innerWidth < 711) {
      setShownMembers(4)
    }
  }
  const onOpenMenu = () => {
    setIsMenuOpen(true);
  }
  const onCloseMenu = () => {
    setIsMenuOpen(false);
  }
  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    modalDetails.current = ev.target.getBoundingClientRect();
    setModalTitle(txt)
    setIsModalOpen(true);
  }
  const onCloseModal = () => {
    setIsModalOpen(false);
  }
  const onToggleStar = () => {
    board.isStar = !board.isStar
    dispatch(updateBoard(board))
  }
  const membersToShow = () => {
    let members = [...board?.members]
    members = members.splice(0, shownMembers)
    return members
  }
  const getLengthOfExtraMembers = () => {
    return board.members.length - shownMembers
  }
  const getMembersForModal = (members) => {
    const membersForModal = members.slice(4)
    return membersForModal
  }

  return (
    <div className="toolbar">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle}
          onCloseModal={onCloseModal}
          board={board}
          users={users}
          boardId={boardId}
          boardMembers={board.members}
          member={membersToShow}
          moreMembers={getMembersForModal(board.members)}
          element={moreMembersRef.current}
        />
      )}
      <Menu
        isMenuOpen={isMenuOpen}
        onCloseMenu={onCloseMenu}
        board={board}
        groups={board.groups}
        activities={board.activities}
      />
      <div className="toolbar-left">
        <span className="board-toolbar-title-container">
          <h1 className="board-toolbar-title">{board.title}</h1>
        </span>
        <span onClick={onToggleStar} className="toolbar-btn star-btn">
          {board.isStar ? <AiFillStar color={"gold"} size={17} /> : <AiOutlineStar size={17} />}
        </span>
        <span className="toolbar-divider"></span>

        <div className="toolbar-members">
          {membersToShow().map((member) => {
            return (
              <div key={member._id} className="user-avatar"
                style={{ background: `url(${member?.imgUrl}) center center / cover ` }}
              >
                <MemberPreview
                  key={member._id}
                  member={member}
                  isInTaskDetails={true}
                  board={board}
                />
              </div>
            )
          })}

          {getLengthOfExtraMembers() > 0 && (
            <div
              className="extra-member-avatar"
              onClick={(ev) => onOpenModal(ev, 'more members')}
            >
              {`+${getLengthOfExtraMembers()}`}
            </div>
          )}
        </div>

        <button onClick={(ev) => onOpenModal(ev, 'Invite to board')} className="share-btn">
          <BsPersonPlus /> Share
        </button>

      </div>
      <div className="toolbar-right">
        <div>
          <span onClick={(ev) => onOpenModal(ev, 'Create Board')} className="create-btn toolbar-btn toolbar-menu-btn">
            <MdOutlineCreateNewFolder /> new board
          </span>
          <span className="toolbar-divider"></span>

          <span className="toolbar-btn toolbar-menu-btn" ref={dashboardRef} onClick={() => navigate(`/board/${board._id}/dashboard`)}>
            <AiOutlineDashboard /> <span className="tool-title">Dashboard</span>
          </span>
          <span className="toolbar-divider"></span>

          <span onClick={(ev) => onOpenModal(ev, 'Filter')} className="toolbar-btn filter-btn">
            <MdOutlineFilterList /> <span className="tool-title">Filter</span>{" "}
          </span>
          <span className="toolbar-divider"></span>

          <span onClick={onOpenMenu} className="toolbar-btn toolbar-menu-btn">
            <FaEllipsisH /> <span className="tool-title">Show menu</span>
          </span>
        </div>
      </div>
    </div >
  )
}
