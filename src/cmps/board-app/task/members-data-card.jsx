import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";
import { MemberPreview } from "../../modals/member-preview";

export const MembersDataCard = ({ task, boardId, groupId, boardMembers }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalDetails = useRef()
  const modalTitle = useRef()

  const onCloseModal = () => {
    setIsModalOpen(false)
  }
  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }


  if (!task.members || !task.members.length) return;
  return (
    <div className="member-data">
      <h3 className="data-gutter-card-title">Members</h3>
      <div className="task-members-preview">
        {task.members.map((member) => (
          <MemberPreview
            key={member._id}
            member={member}
            isInTaskDetails={false}
            task={task}
          // board={board}
          />
        ))}
      </div>

      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          boardId={boardId}
          groupId={groupId}
          task={task}
          type={modalTitle}
          boardMembers={boardMembers}
          onCloseModal={onCloseModal}
        />
      )}
      <div onClick={(ev) => { onOpenModal(ev, 'Members') }} className="add-data-gutter-btn  round-data-btn">
        <FiPlus />
      </div>
    </div>
  );
};
