import { useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { DynamicModalCmp } from '../general/dynamic-modal-cmp'

export const MemberPreview = ({ member, task, board, }) => {
  const memberRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null)
  const modalDetails = useRef();

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    modalDetails.current = ev.target.getBoundingClientRect();
    setModalTitle(txt)
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle}
          member={member}
          onCloseModal={onCloseModal}
          task={task}
          board={board}

        />
      )}

      <div className="member-img-container">
        {member?.imgUrl ? (
          <div onClick={(ev) => onOpenModal(ev, 'member actions')}>
            <img src={member.imgUrl} alt={member.fullname} className="member-img" />
          </div>
        ) : (
          <div onClick={(ev) => onOpenModal(ev, 'member actions')} className="member">
            {member.fullname}
          </div>
        )}
      </div>

    </>
  )
}
