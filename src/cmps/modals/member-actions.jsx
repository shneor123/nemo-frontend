
export const MemberActions = ({ member, task }) => {

  return (
    <div className="member-actions">
      <div className="member-info">
        <div className="member-img-container">
          {member?.imgUrl ? (
            <div>
              <img src={member.imgUrl} alt={member.fullname} className="member-img" />
            </div>
          ) : (
            <div className="member">{member.fullname}</div>
          )}
        </div>

        <div className="member-name">
          <h1 className="member-fullname">{member.fullname}</h1>
          <h2 className="member-username">{member.username}</h2>
        </div>
      </div>
      <button className="remove-btn"
      // onClick={onRemoveMember}
      >
        {task ? 'Remove from task' : 'Remove from board...'}
      </button>
    </div>
  )
}
