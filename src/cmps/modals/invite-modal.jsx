import { useDispatch } from "react-redux";
import { addUserToBoard } from "../../store/actions/board.action";
export const InviteModal = ({ boardId, users, boardMembers }) => {
  const dispatch = useDispatch()
  const boardMemberIds = boardMembers.map(boardMember => boardMember = boardMember._id)
  const usersToInvite = users.filter(user => !boardMemberIds.includes(user._id))

  const onAddUserToBoard = (user) => {
    dispatch(addUserToBoard(boardId, user))
  }

  return (
    <div className="member-modal">
      <input
        type="text"
        className="search-member-input"
        placeholder="Search Members"
      />
      <div className="member-section">
        <h4 className="modal-small-title">Workspace members</h4>
        {usersToInvite.map((user) => {
          return (
            <div
              key={user._id}
              className="modal-member-item-container"
              onClick={() => onAddUserToBoard(user)}
            >
              <div className="modal-member-item">
                <div
                  style={{
                    background: `url(${user?.imgUrl}) center center / cover `,
                    marginRight: "8px",
                  }}
                  className="user-avatar"
                ></div>
                {user.username} ({user.fullname})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
