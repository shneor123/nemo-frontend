import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { utilService } from '../../services/basic/util.service';
import { setModal } from '../../store/actions/app.actions';

export const MemberPreview = ({ member, task, board, }) => {
  const memberActionRef = useRef()
  const dispatch = useDispatch()

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  return (
    <>
      <div className="member-img-container" >
        {member?.imgUrl ? (
          <div ref={memberActionRef} onClick={(ev) => onOpenModal(ev, {
            element: memberActionRef.current,
            category: 'member actions',
            title: 'member actions',
            props: { element: memberActionRef.current, member, task, board },
          })}>
            <img src={member.imgUrl} alt={utilService.getInitials(member.fullname)} className="member-img" />
          </div>
        ) : (
          <div  className="user-initial"  ref={memberActionRef}
            onClick={(ev) => onOpenModal(ev, {
              element: memberActionRef.current,
              category: 'member actions',
              title: 'member actions',
              props: { element: memberActionRef.current, member, task, board },
            })}>
            {utilService.getInitials(member.fullname)}
          </div>
        )}
      </div>

    </>
  )
}
