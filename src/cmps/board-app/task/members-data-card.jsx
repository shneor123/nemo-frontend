import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { utilService } from "../../../services/basic/util.service";
import { setModal } from "../../../store/actions/app.actions";


export const MembersDataCard = ({ board, boardMembers, boardId, groupId, task }) => {
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
          return (
            <div key={member._id} className="user-avatar">
              {member?.imgUrl
                ? <img src={member.imgUrl} className="user-img" alt={utilService.getInitials(member.fullname)} />
                : <span className="user-initial">{utilService.getInitials(member.fullname)}</span>
              }
            </div>
          )
        })}
      </div>
      <div className="add-data-gutter-btn  round-data-btn" ref={membersRef}
        onClick={(ev) => onOpenModal(ev, {
          element: membersRef.current,
          category: 'Members',
          title: 'Members',
          props: { boardMembers, board, boardId, groupId, task },
        })}><FiPlus />
      </div>
    </div >
  )
}