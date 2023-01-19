import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TiTag } from "react-icons/ti";
import { BsArrowRight, BsCheck2Square, BsClock, BsPersonPlus } from "react-icons/bs";
import { RiArchiveLine } from 'react-icons/ri'
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineScreenShare } from "react-icons/md";
import { GiRobotAntennas } from 'react-icons/gi'
import { CgUndo } from "react-icons/cg";
import { HiOutlineMinus } from "react-icons/hi";

import { userService } from "../../../services/basic/user.service";
import { joinTask } from "../../../store/actions/member.action";
import { saveTask } from "../../../store/actions/task.action";
import { AiOutlineCopy, AiOutlineShareAlt, AiOutlineUser } from "react-icons/ai";
import { setModal } from "../../../store/actions/app.actions";

export const TaskSidebar = ({ board, boardMembers, boardId, groupId, task, labels, groupTitle }) => {
  const [modal, setModals] = useState({ isModalOpen: false, type: null, event: null });
  const user = userService.getLoggedinUser()
  const dispatch = useDispatch()
  const attachmentRef = useRef()
  const checklistRef = useRef()
  const membersRef = useRef()
  const deleteRef = useRef()
  const labelsRef = useRef()
  const coverRef = useRef()
  const datesRef = useRef()
  const claraRef = useRef()
  const moveRef = useRef()
  const copyRef = useRef()
  const shareRef = useRef()

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

  const toggleModal = ({ event, type, isMove = false }) => {
    if (modal.isModalOpen) {
      setModals({ ...modal, isModalOpen: false })
      return
    }
    setModals({ isModalOpen: true, type, event, isMove })
  }

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  const onOpenModalNove = (ev) => {
    dispatch(
      setModal({
        element: moveRef.current,
        category: 'Move card',
        title: 'Move card',
        props: { element: moveRef.current, event: modal.event, toggleModal, isMove: modal.isMove = true, task, group: currGroup },
      })
    )
  }

  const onOpenModalCopy = (ev) => {
    dispatch(
      setModal({
        element: copyRef.current,
        category: 'Copy card',
        title: 'Copy card',
        props: { element: copyRef.current, event: modal.event, toggleModal, isMove: modal.isMove = false, task, group: currGroup },
      })
    )
  }

  const onOpenModalChecklist = (ev) => {
    dispatch(
      setModal({
        element: labelsRef.current,
        category: 'Checklist',
        title: 'Checklist',
        props: { element: checklistRef.current, boardId, groupId, taskId: task.id, groupTitle, taskTitle: task.title },
      })
    )
  }

  const currGroup = board?.groups.find(group => group.id === groupId)
  return (
    <div className="task-details-sidebar-container">
      <div className="task-details-sidebar-button-container">
        {(!user || !!task.members.filter(member => member._id === user._id).length) || <><h3 className="task-details-sidebar-section-title">Suggested</h3>
          <button onClick={onJoinTask} className="task-details-sidebar-btn join-btn">
            <BsPersonPlus />
            <span className="task-details-sidebar-btn-text">Join</span>
          </button></>}
        <h3 className="task-details-sidebar-section-title">Add to card</h3>

        <button className="task-details-sidebar-btn" ref={membersRef}
          onClick={(ev) => onOpenModal(ev, {
            element: labelsRef.current,
            category: 'Members',
            title: 'Members',
            props: { element: membersRef.current, groupTitle, attachments: task.attachments, boardMembers, labels, task, group: currGroup, groupId, boardId },
          })}><AiOutlineUser />
          <span className="task-details-sidebar-btn-text">Members</span>
        </button>

        <button className="task-details-sidebar-btn" ref={labelsRef}
          onClick={(ev) => onOpenModal(ev, {
            element: labelsRef.current,
            category: 'Labels',
            title: 'Labels',
            props: { element: moveRef.current, groupTitle, attachments: task.attachments, boardMembers, labels, task, group: currGroup, groupId, boardId },
          })}>
          <TiTag />
          <span className="task-details-sidebar-btn-text">Labels</span>
        </button>

        <button className="task-details-sidebar-btn" ref={checklistRef} onClick={onOpenModalChecklist}>
          <BsCheck2Square />
          <span className="task-details-sidebar-btn-text">Checklist</span>
        </button>

        <button className="task-details-sidebar-btn" ref={datesRef}
          onClick={(ev) => onOpenModal(ev, {
            element: labelsRef.current,
            category: 'Dates',
            title: 'Dates',
            props: { element: datesRef.current, group: currGroup, task, boardId, groupId, groupTitle },
          })}>
          <BsClock />
          <span className="task-details-sidebar-btn-text">Date</span>
        </button>

        <button className="task-details-sidebar-btn" ref={attachmentRef}
          onClick={(ev) => onOpenModal(ev, {
            element: labelsRef.current,
            category: 'Attachment',
            title: 'Attachment',
            props: { element: attachmentRef.current, attachments: task.attachments, group: currGroup, task, boardId, groupId, groupTitle },
          })}>
          <FiPaperclip />
          <span className="task-details-sidebar-btn-text">Attachment</span>
        </button>

        <button className="task-details-sidebar-btn" ref={coverRef}
          onClick={(ev) => onOpenModal(ev, {
            element: coverRef.current,
            category: 'Cover',
            title: 'Cover',
            props: { element: coverRef.current, attachments: task.attachments, group: currGroup, task, boardId, groupId, groupTitle },
          })}><MdOutlineScreenShare />
          <span className="task-details-sidebar-btn-text">Cover</span>
        </button>

        <button className="task-details-sidebar-btn" ref={claraRef}
          onClick={(ev) => onOpenModal(ev, {
            element: claraRef.current,
            category: 'AI Clara',
            title: 'AI Clara',
            props: { element: claraRef.current, attachments: task.attachments, group: currGroup, task, boardId, groupId, groupTitle },
          })}><GiRobotAntennas />
          <span className="task-details-sidebar-btn-text">AI Clara</span>
        </button>
      </div>

      <h3 className="task-details-sidebar-section-title actions">Actions</h3>
      <div className="sidebar-button" ref={moveRef} onClick={onOpenModalNove}>
        <span className="sidebar-icon"> <BsArrowRight /> </span>
        <span>Move</span>
      </div>
      <div className="sidebar-button" ref={copyRef} onClick={onOpenModalCopy}>
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
              onClick={(ev) => onOpenModal(ev, {
                element: deleteRef.current,
                category: 'task-delete',
                title: 'task-delete',
                props: { element: deleteRef.current },
              })}><span className="sidebar-icon"> <HiOutlineMinus /> </span>
              <span>Delete</span>
            </div>
          </div>
        ) : (
          <div className="sidebar-button" onClick={onArchiveTask}>
            <span className="sidebar-icon"> <RiArchiveLine /> </span>
            <span>Archive</span>
          </div>
        )}
        <div className="sidebar-button" ref={shareRef}
          onClick={(ev) => onOpenModal(ev, {
            element: shareRef.current,
            category: 'Share',
            title: 'Share and more…',
            props: { element: shareRef.current, },
          })}>
          <span className="sidebar-icon"> <AiOutlineShareAlt /> </span>
          <span>Share</span>
        </div>
      </div>
    </div >
  )
}