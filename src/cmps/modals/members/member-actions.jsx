import { useRef } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { utilService } from "../../../services/basic/util.service"
import { boardService } from "../../../services/board/board.service"
import { setModal } from "../../../store/actions/app.actions"
import { CgClose } from 'react-icons/cg'
import { IoIosArrowBack } from 'react-icons/io'


export const MemberActions = ({ task, member, board }) => {
  const dispatch = useDispatch()
  const imgRef = useRef()
  const backMembersRef = useRef()
  const { users } = useSelector((storeState) => storeState.userModule)

  const onRemoveMember = () => {
    dispatch(setModal(null))
    if (!task) board.members = board.members.filter((currMember) => currMember._id !== member._id)
    else {
      const memberIdx = task.members.findIndex((currMember) => currMember._id === member._id)
      task.members.splice(memberIdx, 1)
    }
    onUpdateBoard(board)
  }

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
      <button className="close-btn" onClick={() => dispatch(setModal(null))}>
        <CgClose className="close-icon" />
      </button>
      {/* <button className="back-btn"onClick={() => dispatch(setModal(null))}><IoIosArrowBack className="close-icon" /></button> */}
      <div className="member-info">
        <div className="member-img-container" ref={imgRef}>
          {member?.imgUrl ? (
            <div
              onClick={(ev) => onOpenModal(ev, {
                element: imgRef.current,
                category: 'Img modal',
                title: 'Img modal',
                props: { element: imgRef.current, member },
              })}>
              <img src={member.imgUrl} alt={utilService.getInitials(member.fullname)} className="member-img" />
            </div>
          ) : (
            <a className="member">{utilService.getInitials(member.fullname)}</a>
          )}
        </div>

        <div className="member-name">
          <h1 className="member-fullname">{member.fullname}</h1>
          <h2 className="member-username">{member.username === 'guest' ? 'guest@gmail.com' : member.username}</h2>
        </div>
      </div>
      <button className="remove-btn" onClick={onRemoveMember}>
        {task ? 'Remove from task...' : 'Remove from board'}
      </button>
    </div>
  )
}
