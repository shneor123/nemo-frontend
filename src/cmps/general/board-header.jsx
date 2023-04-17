// import { useRef, useState } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router"

// import { FaEllipsisH } from "react-icons/fa"
// import { BsFilter, BsPersonPlus } from "react-icons/bs"
// import { MdOutlineFilterList } from "react-icons/md"
// import { AiOutlineStar, AiFillStar, AiOutlineDashboard } from "react-icons/ai"

// import { Menu } from "./menu"
// import { MemberPreview } from "../modals/members/member-preview"
// import { useForm } from "../../hooks/useForm"
// import { setModal } from "../../store/actions/app.actions"
// import { boardService } from "../../services/board/board.service"

// export const BoardHeader = ({ boardId, board, users }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const shareRef = useRef()
//   const filterRef = useRef()
//   const dashboardRef = useRef()
//   const moreMembersRef = useRef()

//   const [fields] = useForm({ boardTitle: board.title, })

//   const onOpenMenu = () => {
//     setIsMenuOpen(true);
//   }

//   const onCloseMenu = () => {
//     setIsMenuOpen(false);
//   }

//   const onToggleStar = () => {
//     board.isStar = !board.isStar
//     dispatch(updateBoard(board))
//   }

//   const onOpenModal = (ev, modal) => {
//     ev.stopPropagation()
//     dispatch(setModal(modal))
//   }

//   const currGroup = board?.groups.find(group => group)
//   const currTask = currGroup?.tasks?.find(task => task)

//   const getMembersForModal = (members) => {
//     const membersForModal = members.slice(3)
//     return membersForModal
//   }

//   const getMembersForPreview = (members) => {
//     const membersForPreview = members.slice(0, 3)
//     return membersForPreview
//   }

//   const onUpdateBoard = async (updatedBoard) => {
//     try {
//       await boardService.save(updatedBoard)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const updateBoard = (updatedTask) => {
//     fields.boardTitle = updatedTask.title
//     onUpdateBoard(...board, boardId)
//   }

//   const getStarClass = () => {
//     const className = board.isStar ? 'star-btn full' : 'star-btn outline'
//     return className
//   }

//   return (
//     <section className="board-header">
//       <div className="left-container">
//         <span className="board-toolbar-title-container">
//           <h1>{board.title}</h1>
//         </span>
//         <button onClick={onToggleStar} className={getStarClass()}>
//           {board.isStar ? <AiFillStar className="star-icon" size={17} /> : <AiOutlineStar className="star-icon" size={17} />}
//         </button>
//         <span className="toolbar-divider"></span>
//         {board.members && (
//           <div className="member-img-container">
//             {board.members.length <= 4 &&
//               board.members.map((member) => (
//                 <MemberPreview key={member._id} member={member} isInTaskDetails={true} board={board} currTask={currTask} />
//               ))}
//             {board.members.length > 4 &&
//               getMembersForPreview(board.members).map((member) => (
//                 <MemberPreview key={member._id} member={member} isInTaskDetails={true} board={board} currTask={currTask} />
//               ))}
//             {board.members.length > 4 && (
//               <button className="more-members" ref={moreMembersRef}
//                 onClick={(ev) => onOpenModal(ev, {
//                   category: 'more members', element: moreMembersRef.current, title: 'More members', props: { element: moreMembersRef.current, board, users, boardId, boardMembers: board.members, moreMembers: getMembersForModal(board.members) },
//                 })}>{" "}
//                 +{getMembersForModal(board.members).length}
//               </button>
//             )}
//           </div>
//         )}
//         <button className="share-btn" ref={shareRef}
//           onClick={(ev) => onOpenModal(ev, {
//             element: shareRef.current, category: 'Invite to board', title: 'Invite to board', props: { element: shareRef.current, board, boardId, users, boardId, boardMembers: board.members, moreMembers: getMembersForModal(board.members) },
//           })}><BsPersonPlus /><span className="share-btn-icon">Invite</span>
//         </button>
//       </div>
//       <span className="toolbar-divider"></span>
//       <div className="right-container">
//         <button className="dashboard-btn" ref={dashboardRef} onClick={() => navigate(`/board/${board._id}/dashboard`)}>
//           <AiOutlineDashboard className="filter-icon" />
//         </button>
//         <span className="toolbar-divider"></span>
//         <button className="filter-btn" ref={filterRef}
//           onClick={(ev) => onOpenModal(ev, {
//             element: filterRef.current, category: 'Filter', title: 'Filter', props: { element: filterRef.current, board },
//           })}><MdOutlineFilterList className="filter-icon" />
//         </button>
//         <span className="toolbar-divider"></span>
//         <button onClick={onOpenMenu} className="show-menu"> {" "}
//           <FaEllipsisH className="icon" />
//         </button>
//         <Menu isMenuOpen={isMenuOpen} onCloseMenu={onCloseMenu} board={board} groups={board.groups} activities={board.activities} />
//       </div>
//     </section>
//   )
// }


import {  useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { FaEllipsisH } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineFilterList } from "react-icons/md";
import { AiOutlineStar, AiFillStar, AiOutlineDashboard } from "react-icons/ai";

import { Menu } from "./menu";
import { MemberPreview } from "../modals/members/member-preview";
import { setModal } from "../../store/actions/app.actions";
import { boardService } from "../../services/board/board.service";
import { useForm } from "../../hooks/useForm";

export const BoardHeader = ({ boardId, board, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shareRef = useRef()
  const filterRef = useRef()
  const dashboardRef = useRef()
  const moreMembersRef = useRef()

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

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  const currGroup = board?.groups.find(group => group);
  const currTask = currGroup?.tasks?.find(task => task);

  const getMembersForModal = (members) => {
    const membersForModal = members.slice(3)
    return membersForModal
  }

  const getMembersForPreview = (members) => {
    const membersForPreview = members.slice(0, 3)
    return membersForPreview
  }


  const [fields, handleChange, clearFields] = useForm({
    newTaskTitle: "",
    boardTitle: board.title,
  });


  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }

  const updateBoard = (updatedTask) => {
    fields.boardTitle = updatedTask.title
    onUpdateBoard(...board,boardId)
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
        {board.members && (
          <div className="toolbar-members">
            {board.members.length <= 4 &&
              board.members.map((member) => (
                <MemberPreview key={member._id} member={member} isInTaskDetails={true} board={board} currTask={currTask} />
              ))}
            {board.members.length > 4 &&
              getMembersForPreview(board.members).map((member) => (
                <MemberPreview
                  key={member._id}
                  member={member}
                  isInTaskDetails={true}
                  board={board}
                  currTask={currTask} />
              ))}
            {board.members.length > 4 && (
              <div ref={moreMembersRef} className="extra-member-avatar"
                onClick={(ev) => onOpenModal(ev, {
                  category: 'more members',
                  element: moreMembersRef.current,
                  title: 'More members',
                  props: { element: moreMembersRef.current, board, users, boardId, boardMembers: board.members, moreMembers: getMembersForModal(board.members) },
                })}>
                +{getMembersForModal(board.members).length}
              </div>
            )}
          </div>
        )}
        <button className="share-btn" ref={shareRef}
          onClick={(ev) => onOpenModal(ev, {
            element: shareRef.current,
            category: 'Invite to board',
            title: 'Invite to board',
            props: { element: shareRef.current, board, boardId, users, boardId, boardMembers: board.members, moreMembers: getMembersForModal(board.members) },
          })}><BsPersonPlus /> <span className="share-btn-icon">Invite</span></button>
      </div>
      <div className="toolbar-right">
        <div>
          <span className="toolbar-btn toolbar-menu-btn" ref={dashboardRef} onClick={() => navigate(`/board/${board._id}/dashboard`)}>
            <AiOutlineDashboard /> <span className="tool-title share-btn-icon">Dashboard</span>
          </span>
          <span className="toolbar-divider"></span>
          <span className="toolbar-btn filter-btn" ref={filterRef}
            onClick={(ev) => onOpenModal(ev, {
              element: filterRef.current,
              category: 'Filter',
              title: 'Filter',
              props: { element: filterRef.current, board },
            })}><MdOutlineFilterList /> <span className="tool-title share-btn-icon">Filter</span>{" "}
          </span>
          <span className="toolbar-divider"></span>

          <span onClick={onOpenMenu} className="toolbar-btn toolbar-menu-btn">
            <FaEllipsisH /> <span className="tool-title share-btn-icon">Show menu</span>{" "}
          </span>
        </div>
      </div>
    </div >
  )
}