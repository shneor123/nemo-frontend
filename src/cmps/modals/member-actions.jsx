import { boardService } from "../../services/board.service"

export const MemberActions = ({ task, member, board }) => {
  const onRemoveMember = () => {
    const memberIdx = board.members.findIndex((boardMember) => boardMember.id === member._id)
    board.members.splice(memberIdx, 1)
    onUpdateBoard(board)
  }

  // const onRemoveMember = () => {
  //   if (!task) board.members = board.members.filter((currMember) => currMember._id !== member._id)
  //   else {
  //     const memberIdx = task.members.findIndex((currMember) => currMember._id === member._id)
  //     task.members.splice(memberIdx, 1)
  //   }
  //   onUpdateBoard(board)
  // }



  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }
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
      <button className="remove-btn" onClick={onRemoveMember}>
        {board ? 'Remove from board...' : 'Remove from task'}
      </button>
    </div>
  )
}