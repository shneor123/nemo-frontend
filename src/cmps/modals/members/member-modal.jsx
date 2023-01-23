import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMember } from "../../../store/actions/member.action";
import { utilService } from "../../../services/basic/util.service";
import { FiCheck } from "react-icons/fi";
import { setModal } from "../../../store/actions/app.actions";

export const MemberModal = ({ boardMembers, boardId, groupId, task }) => {
  const memberIds = task.members.map((member) => member._id);
  const [searchMember, setSearchMember] = useState('')
  const [filterMembers, setFilterMembers] = useState(boardMembers)

  const dispatch = useDispatch()

  const toggleUser = (user) => {
    dispatch(setModal(null))
    dispatch(toggleMember(boardId, groupId, task.id, user));
  }

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterMembers(boardMembers.filter((member) =>
      member.fullname.toLowerCase().includes(target.value.toLowerCase())))
  }

  return (
    <div className="member-modal">
      <input type="text"
        className="search-member-input"
        placeholder="Search members"
        value={searchMember}
        onChange={handleChange} />

      <div className="member-section">
        <h4 className="modal-small-title">Board members</h4>
        {filterMembers && filterMembers?.map((user) => {
          return <div
            key={user._id}
            onClick={() => toggleUser(user)}
            className="modal-member-item-container">
            <div className="modal-member-item user-img-container">
              <div
                style={{ marginRight: "8px" }}
                className="user-avatar">
                {user?.imgUrl ? (
                  <img src={user.imgUrl} className="user-img" alt={utilService.getInitials(user.fullname)} />
                ) : (
                  <span className="user-initial">{user.username}</span>
                )}
              </div>
              {user.fullname}
              {memberIds.includes(user._id) && (
                <div className="modal-member-check-icon"> <FiCheck /> </div>
              )}
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
