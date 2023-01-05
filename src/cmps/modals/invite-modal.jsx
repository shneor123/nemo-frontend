import { useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { utilService } from "../../services/util.service";
import { addUserToBoard } from "../../store/actions/board.action";
import { toggleMember } from "../../store/actions/member.action";


export const InviteModal = ({ boardId, users, boardMembers }) => {
  console.log(users);
  const dispatch = useDispatch()
  const boardMemberIds = boardMembers.map(boardMember => boardMember = boardMember._id)
  const usersToInvite = users.filter(user => !boardMemberIds.includes(user._id))

  const onAddUserToBoard = (user) => {
    dispatch(addUserToBoard(boardId, user))
  }

  const [isQRShown, setIsQRShown] = useState(false);

  return (
    <div className="member-modal">
      <input
        type="text"
        className="search-member-input"
        placeholder="Search Members"
      />
      <div className="member-section">
        <div className="flex justify-space-between">
          <h4 className="modal-small-title" onClick={() => { setIsQRShown(prevIsQRShown => !prevIsQRShown) }}>Workspace members</h4>
        </div>
        {usersToInvite.map((user) => {
          return (
            <div
              key={user._id}
              className="modal-member-item-container"
              onClick={() => onAddUserToBoard(user)}
            >
              <div className="modal-member-item user-img-container">
                <div
                  style={{ marginRight: "8px" }}
                  className="user-avatar">
                  {user?.imgUrl ? (
                    <img src={user.imgUrl} className="user-img" alt={utilService.getInitials(user.fullname)} />
                  ) : (
                    <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
                  )}
                </div>
                {user.fullname}
              </div>
            </div>
          );
        })}
        {isQRShown && <section className="qr-code flex justify-center">
          <QRCode value={`https://ca-nemo-react.onrender.com/${boardId}`} />
        </section>}
      </div>
    </div >
  );
};
