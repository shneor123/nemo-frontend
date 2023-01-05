import { useRef, useState } from 'react';
import { DynamicModalCmp } from '../general/dynamic-modal-cmp';

export function MoreMembers({ moreMembers, board, task, element, member, onCloseModal }) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(null)
  const modalDetails = useRef()
  const initials = (member) => [...member.fullname]


  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalDetails.current = ev.target.getBoundingClientRect()
    setModalTitle(txt)
    setIsModalOpen(true)
  }

  return (
    <div className="member-section">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle}
          moreMembers={moreMembers}
          board={board}
          element={element}
          member={member}
          onCloseModal={onCloseModal}
        />
      )}
      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul>{moreMembers.map(member =>
            member?.imgUrl ? (
              <li key={member._id} onClick={(ev) => onOpenModal(ev, 'member actions')}>
                <div className="member-list">
                  <span className="member-img" style={{ backgroundImage: `url('${member.imgUrl}')` }}></span>
                  <span className="member-txt">{`${member.fullname}`}</span>
                </div>
              </li>
            ) : (
              <li key={member._id} onClick={(ev) => onOpenModal(ev, 'member actions')}>
                <a className="member-list">
                  <span className="member">{`${initials(member)[0]}${initials(member)[1]}`}</span>
                  <span className="member-txt">{`${member.fullname}`}</span>
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}
