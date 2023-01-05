
export const MemberActions = ({ boardMembers, task }) => {
  return (
    <div className="member-actions">
      <div className="member-info">
        <div className="member-img-container">
          {boardMembers.map((user) => {
            return (<div key={user._id}>
              <div>
                {user?.imgUrl ?
                  <img src={user.imgUrl} alt={user.fullname} className="member-img" />
                  : <a className="member">{user.fullname}</a>
                }
              </div>
            </div>)
          })}
        </div>

        <div className="member-name">
          <h1 className="member-fullname">{boardMembers.fullname}</h1>
          <h2 className="member-username">{boardMembers.username}</h2>
        </div>
      </div>
      <button className="remove-btn"  >
        {task ? 'Remove from task' : 'Remove from board...'}
      </button>
    </div>
  )
}
