import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineStar, AiFillStar, AiOutlineDashboard, AiOutlinePlus } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { Menu } from "./menu";
import { updateBoard } from "../../store/actions/board.action";
import { useNavigate } from "react-router";
import { MemberPreview } from "../modals/member-preview";
import { setModal } from "../../store/actions/app.actions";


export const ToolBar = ({ boardId, board, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shownMembers, setShownMembers] = useState('4')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shareRef = useRef()
  const filterRef = useRef()
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
  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }
  return (
    <div className="toolbar">
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
                style={{ background: `url(${member?.imgUrl}) center center / cover ` }}>
                <MemberPreview key={member._id} member={member} isInTaskDetails={true} board={board} />
              </div>
            )
          })}

          {getLengthOfExtraMembers() > 0 && (
            <div className="extra-member-avatar" ref={moreMembersRef}
              onClick={(ev) => onOpenModal(ev, {
                element: moreMembersRef.current,
                category: 'more members',
                title: 'more members',
                props: { element: moreMembersRef.current, board, users, boardId, boardMembers: board.members, member: membersToShow(), moreMembers: getMembersForModal(board.members) },
              })}>{`+${getLengthOfExtraMembers()}`}
            </div>)}
        </div>

        <button className="share-btn" ref={shareRef}
          onClick={(ev) => onOpenModal(ev, {
            element: shareRef.current,
            category: 'Invite to board',
            title: 'Invite to board',
            props: { element: shareRef.current, board, users, boardId, boardMembers: board.members, member: membersToShow(), moreMembers: getMembersForModal(board.members) },
          })}><BsPersonPlus /> Invite</button>
      </div>
      <div className="toolbar-right">
        <div>
          <span className="toolbar-btn toolbar-menu-btn" ref={dashboardRef} onClick={() => navigate(`/board/${board._id}/dashboard`)}>
            <AiOutlineDashboard /> <span className="tool-title">Dashboard</span>
          </span>
          <span className="toolbar-divider"></span>

          <span className="toolbar-btn filter-btn" ref={filterRef}
            onClick={(ev) => onOpenModal(ev, {
              element: filterRef.current,
              category: 'Filter',
              title: 'Filter',
              props: { element: filterRef.current, board },
            })}><MdOutlineFilterList /> <span className="tool-title">Filter</span>{" "}
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
