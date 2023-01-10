import { useDispatch } from "react-redux";
import { toggleMember } from "../../store/actions/member.action";
import { FiCheck } from "react-icons/fi";
import { utilService } from "../../services/basic/util.service";

export const MemberModal = ({ boardMembers, boardId, groupId, task, users }) => {
  const dispatch = useDispatch();
  const memberIds = task.members.map((member) => member._id);

  const toggleUser = (user) => {
    dispatch(toggleMember(boardId, groupId, task.id, user));
  }

  return (
    <div className="member-modal">
      <input
        type="text"
        className="search-member-input"
        placeholder="Search Members"
      />
      <div className="member-section">
        <h4 className="modal-small-title">Board members</h4>
        {boardMembers.map((user) => {
          return (
            <div
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
                  <div className="modal-member-check-icon">
                    <FiCheck />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
