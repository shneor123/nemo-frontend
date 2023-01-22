import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../store/actions/app.actions';
import { MemberPreview } from './member-preview';

export function MoreMembers({ moreMembers, board }) {
  const moreRef = useRef()
  const dispatch = useDispatch()
  const initials = (member) => { return [...member.fullname] }

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }
  return (
    <div className="member-section">
      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul>{moreMembers.map(member =>
          member?.imgUrl ? (
            <li key={member._id}>
              <div className="member-list">
                <span className='member-img'> <MemberPreview member={member} board={board} /> </span>
                <span className="member-txt">{`${member.fullname}`}</span>
              </div>
            </li>
          ) : (
            <li key={member._id} ref={moreRef} onClick={(ev) => onOpenModal(ev, {
              element: moreRef.current,
              category: 'member actions',
              title: 'member actions',
              props: { element: moreRef.current, board, moreMembers, member: moreMembers },
            })}>
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
