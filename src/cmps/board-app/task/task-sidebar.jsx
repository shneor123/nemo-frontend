import { TiTag } from "react-icons/ti";
import { BsCheck2Square, BsClock, BsPersonPlus } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineScreenShare } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";
import { userService } from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { joinTask } from "../../../store/actions/member.action";
import { GiRobotAntennas } from 'react-icons/gi'

export const TaskSidebar = ({ boardMembers, boardId, groupId, task, labels, groupTitle }) => {
  const buttons = [
    { txt: "Members", icon: <BsPerson /> },
    { txt: "Labels", icon: <TiTag /> },
    { txt: "Checklist", icon: <BsCheck2Square /> },
    { txt: "Dates", icon: <BsClock /> },
    { txt: "Attachment", icon: <FiPaperclip /> },
    { txt: "Cover", icon: <MdOutlineScreenShare /> },
    { txt: "AI Clara", icon: <GiRobotAntennas /> },
  ]

  const user = userService.getLoggedinUser()
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalDetails = useRef();
  const modalTitle = useRef();


  const onJoinTask = () => {
    dispatch(joinTask(boardId, groupId, task.id, user))
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    modalTitle.current = txt;
    modalDetails.current = ev.target.getBoundingClientRect();
    setIsModalOpen(true);
  };

  return (
    <div className="task-details-sidebar-container">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          boardId={boardId}
          groupId={groupId}
          task={task}
          type={modalTitle}
          labels={labels}
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
          );
        })}
      </div>
    </div>
  );
};
