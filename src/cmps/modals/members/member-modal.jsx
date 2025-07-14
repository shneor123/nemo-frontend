import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCheck2 } from 'react-icons/bs'

import { utilService } from "../../../services/basic/util.service";
import { saveTask } from "../../../store/actions/task.action";

export const MemberModal = ({ boardId, groupId, board, task }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(({ userModule }) => userModule)

  const [filterMembers, setFilterMembers] = useState(board.members)
  const [taskMembers, setTaskMembers] = useState(task.members)
  const [searchMember, setSearchMember] = useState('')
  const memberIds = task.members.map((member) => member._id);
  if (!task) return
  if (!board) return

  const onToggle = (id) => {
    const taskMemberIdx = taskMembers.findIndex((taskMember) => taskMember._id === id)
    const boardMemberIdx = board.members.findIndex((boardMember) => boardMember._id === id)
    const updatedTaskMembers = [...taskMembers]
    taskMemberIdx >= 0
      ? updatedTaskMembers.splice(taskMemberIdx, 1)
      : updatedTaskMembers.push(board.members[boardMemberIdx])
    setTaskMembers(updatedTaskMembers)

    if (id === user._id && taskMemberIdx === -1) {
      updateTask({ ...task, members: updatedTaskMembers })
    }
    updateTask({ ...task, members: updatedTaskMembers })
  }

  const updateTask = (updatedTask) => {
    task.members = updatedTask.members
    dispatch(saveTask(task, boardId, groupId))
  }

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterMembers(
      board.members.filter((member) =>
        member.fullname.toLowerCase().includes(target.value.toLowerCase()))
    )
  }

  return (
    <div className="member-section">
      <input className="search-member-input" type="text" placeholder="Search members" value={searchMember} onChange={handleChange} />
      <div className="member-section">

        <h4 className="modal-small-title">Board members</h4>

        {filterMembers && filterMembers?.map((user) => {
          return (
            <div key={user._id} className="modal-member-item-container"
              onClick={() => onToggle(user._id)}>
              <div className="modal-member-item user-img-container">
                <div style={{ marginRight: "8px" }} className="user-avatar">
                  {user?.imgUrl
                    ? <img src={user.imgUrl} className="user-img" alt={utilService.getInitials(user.fullname)} />
                    : <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
                  }
                </div>
                {user.fullname}
                {memberIds.includes(user._id) && <div className="modal-member-check-icon"> <BsCheck2 /> </div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}