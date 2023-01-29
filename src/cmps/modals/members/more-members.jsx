import { useDispatch } from 'react-redux';
import { utilService } from '../../../services/basic/util.service';
import { setModal } from '../../../store/actions/app.actions';

export function MoreMembers({ moreMembers, board, element }) {
  const dispatch = useDispatch()

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  return (
    <div className="member-section">
      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul>{moreMembers.map(member =>
          member?.imgUrl ? (
            <li key={member._id} onClick={(ev) => onOpenModal(ev, {
              element,
              category: 'member actions',
              title: 'member actions',
              props: { element, board, moreMembers, member },
            })}>
              <div className="member-list">
                <span className="member-img" style={{ backgroundImage: `url('${member.imgUrl}')` }}></span>
                <span className="member-txt">{`${member.fullname}`}</span>
              </div>
            </li>
          ) : (
            <li key={member._id} onClick={(ev) => onOpenModal(ev, {
              element,
              category: 'member actions',
              title: 'member actions',
              props: { element, board, moreMembers, member },
            })}>
              <div className="member-list">
                <span className="member">{utilService.getInitials(member.fullname)}</span>
                <span className="member-txt">{`${member.fullname}`}</span>
              </div>
            </li>
          )
        )}
        </ul>
      </div>
    </div>
  )
}
