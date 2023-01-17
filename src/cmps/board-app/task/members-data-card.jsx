import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/actions/app.actions";
import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";

export const MembersDataCard = ({ task, boardId, groupId, boardMembers }) => {

  const dispatch = useDispatch()
  const membersRef = useRef()
  const labelsRef = useRef()
  const coverRef = useRef()
  const datesRef = useRef()
  const claraRef = useRef()

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }


  if (!task.members || !task.members.length) return;
  return (
    <div className="member-data">
      <h3 className="data-gutter-card-title">Members</h3>
      <div className="task-members-preview">
        {task?.members.map(member => {
          return <div key={member._id} style={{ background: `url(${member.imgUrl}) center center / cover ` }} className="user-avatar"></div>
        })}
      </div>


      {/* {isModalOpen && (
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
      )} */}
      <div


        className="add-data-gutter-btn  round-data-btn"
        ref={membersRef}
        onClick={(ev) =>
          onOpenModal(ev, {
            element: membersRef.current,
            category: 'Members',
            title: 'Members',
            props: { task, boardId, groupId, boardMembers },
          })}><FiPlus />
      </div>
    </div >
  );
};
