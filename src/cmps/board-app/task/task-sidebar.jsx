import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TiTag } from "react-icons/ti";
import { BsArrowRight, BsCheck2Square, BsClock, BsPersonPlus } from "react-icons/bs";
import { RiArchiveLine } from 'react-icons/ri'
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineScreenShare } from "react-icons/md";
import { GiRobotAntennas } from 'react-icons/gi'
import { BsPerson } from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import { HiOutlineMinus } from "react-icons/hi";

import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";
import { userService } from "../../../services/basic/user.service";
import { joinTask } from "../../../store/actions/member.action";
import { saveTask } from "../../../store/actions/task.action";
import { AiOutlineCopy, AiOutlineUser } from "react-icons/ai";

export const TaskSidebar = ({ board, boardMembers, boardId, groupId, task, labels, groupTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = userService.getLoggedinUser()
  const dispatch = useDispatch()
  const modalDetails = useRef()
  const modalTitle = useRef()
  const deleteRef = useRef()

  const buttons = [
    { txt: "Members", icon: <AiOutlineUser /> },
    { txt: "Labels", icon: <TiTag /> },
    { txt: "Checklist", icon: <BsCheck2Square /> },
    { txt: "Dates", icon: <BsClock /> },
    { txt: "Attachment", icon: <FiPaperclip /> },
    { txt: "Cover", icon: <MdOutlineScreenShare /> },
    { txt: "AI Clara", icon: <GiRobotAntennas /> },
  ]

  const onJoinTask = () => {
    dispatch(joinTask(boardId, groupId, task.id, user))
  }

  const onRestoreTask = () => {
    updateTask({ ...task, archivedAt: null })
  }

  const onArchiveTask = () => {
    updateTask({ ...task, archivedAt: Date.now() })
  }

  const updateTask = (updatedTask) => {
    task.archivedAt = updatedTask.archivedAt
    const activity = {
      txt: "archivedAt this task" + task.title,
      boardTxt: "archivedAt the " + task.title,
      byMember: userService.getLoggedinUser() || {
        username: "guest",
        fullname: "guest",
        imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      },
    }
    dispatch(saveTask(task, boardId, groupId, activity))
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }

  const [modal, setModal] = useState({ isModalOpen: false, type: null, event: null });

  const toggleModal = ({ event, type, isMove = false }) => {
    if (modal.isModalOpen) {
      setModal({ ...modal, isModalOpen: false })
      return
    }
    setModal({ isModalOpen: true, type, event, isMove })
  }

  const currGroup = board?.groups.find(group => group.id === groupId)
  return (
    <div className="task-details-sidebar-container">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          boardId={boardId}
          groupId={groupId}
          group={currGroup}
          task={task}
          type={modalTitle}
          labels={labels}
          isMove={modal.isMove}
          toggleModal={toggleModal}
          event={modal.event}
          boardMembers={boardMembers}
          attachments={task.attachments}
          onCloseModal={onCloseModal}
          groupTitle={groupTitle}
        />
      )}
      <div className="task-details-sidebar-button-container">
        {(!user || !!task.members.filter(member => member._id === user._id).length) || <><h3 className="task-details-sidebar-section-title">Suggested</h3>
          <button onClick={onJoinTask} className="task-details-sidebar-btn join-btn">
            <BsPersonPlus />
            <span className="task-details-sidebar-btn-text">Join</span>
          </button></>}
        <h3 className="task-details-sidebar-section-title">Add to card</h3>
        {buttons.map((button) => {
          return (
            <button
              onClick={(ev) => {
                onOpenModal(ev, button.txt);
              }}
              key={button.txt}
              className="task-details-sidebar-btn"
            >
              {button.icon}
              <span className="task-details-sidebar-btn-text">
                {button.txt}
              </span>
            </button>
          )
        })}
      </div>

      <h3 className="task-details-sidebar-section-title actions">Actions</h3>
      <div className="sidebar-button" onClick={(ev) => { onOpenModal(ev, 'Move card', modal.isMove = true) }}>
        <span className="sidebar-icon"> <BsArrowRight /> </span>
        <span>Move</span>
      </div>
      <div className="sidebar-button" onClick={(ev) => { onOpenModal(ev, 'Copy card') }}>
        <span className="sidebar-icon"> <AiOutlineCopy /> </span>
        <span>Copy</span>
      </div>

      <div>
        {task.archivedAt ? (
          <div>
            <div className="sidebar-button" onClick={onRestoreTask}>
              <span className="sidebar-icon"> <CgUndo /> </span>
              <span>Send to board</span>
            </div>

            <div className="sidebar-button delete-btn" ref={deleteRef}
              onClick={(ev) => { onOpenModal(ev, 'task-delete'); }}>
              <span className="sidebar-icon"> <HiOutlineMinus /> </span>
              <span>Delete</span>
            </div>
          </div>
        ) : (
          <div className="sidebar-button" onClick={onArchiveTask}>
            <span className="sidebar-icon"> <RiArchiveLine /> </span>
            <span>Archive</span>
          </div>
        )}
      </div>
    </div >
  )
}

