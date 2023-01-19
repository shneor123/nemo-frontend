import { useRef } from "react"
import { useDispatch } from "react-redux"
import { utilService } from "../../services/basic/util.service"
import { boardService } from "../../services/board/board.service"
import { setModal } from "../../store/actions/app.actions"

export const MemberActions = ({ task, member, board }) => {
  const imgRef = useRef()
  const dispatch = useDispatch()

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

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  return (
    <div className="member-actions">
      <div className="member-info">
        <div className="member-img-container" ref={imgRef}>
          {member?.imgUrl ? (
            <div onClick={(ev) => onOpenModal(ev, {
              element: imgRef.current,
              category: 'Img modal',
              title: 'Img modal',
              props: { element: imgRef.current, member },
            })}>
              <img src={member.imgUrl} alt={utilService.getInitials(member.fullname)} className="member-img" />
            </div>
          ) : (
            <div className="member">{utilService.getInitials(member.fullname)}</div>
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
