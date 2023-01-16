import { useRef, useState } from "react"
import { utilService } from "../../services/basic/util.service"
import { boardService } from "../../services/board/board.service"
import { DynamicModalCmp } from "../../cmps/general/dynamic-modal-cmp"

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


  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalDetails = useRef()
  const modalTitle = useRef()

  const onCloseModal = () => {
    setIsModalOpen(false)
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }

  return (
    <div className="member-actions">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          member={member}
          onCloseModal={onCloseModal}
        />
      )}
      <div className="member-info">
        <div className="member-img-container">
          {member?.imgUrl ? (
            <div onClick={(ev) => { onOpenModal(ev, 'Img modal') }}>
              <img src={member.imgUrl} alt={utilService.getInitials(member.fullname)} className="member-img" />
            </div>
          ) : (
            <div className="member">{utilService.getInitials(member.fullname)}</div>
          )}
        </div>

        <div className="member-name">
          <h1 className="member-fullname">{utilService.getInitials(member.fullname)}</h1>
          <h2 className="member-username">{utilService.getInitials(member.username)}</h2>
        </div>
      </div>
      <button className="remove-btn" onClick={onRemoveMember}>
        {board ? 'Remove from board...' : 'Remove from task'}
      </button>
    </div>
  )
}
