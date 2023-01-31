import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/actions/app.actions";
import { MemberPreview } from "../../modals/members/member-preview";


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
        {task.members?.map((member) => (
          <MemberPreview key={member._id} member={member} task={task} board={board} />
        ))}
      </div>
      <div className="add-data-gutter-btn  round-data-btn" ref={membersRef}
        onClick={(ev) => onOpenModal(ev, {
          element: membersRef.current,
          category: 'Members',
          title: 'Members',
          props: { boardMembers, board, boardId, groupId, task },
        })}><span className="fa-regular plus-icon"></span>
      </div>
    </div >
  )
}