import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/actions/app.actions";


export const MembersDataCard = ({ task, boardId, board, groupId, boardMembers }) => {
  const membersRef = useRef()
  const dispatch = useDispatch()

  const onOpenModal = (ev, modal) => {
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
      <div className="add-data-gutter-btn  round-data-btn" ref={membersRef}
        onClick={(ev) => onOpenModal(ev, {
          element: membersRef.current,
          category: 'Members',
          title: 'Members',
          props: { boardId, groupId, task, boardMembers },
        })}><FiPlus />
      </div>
    </div >
  )
}