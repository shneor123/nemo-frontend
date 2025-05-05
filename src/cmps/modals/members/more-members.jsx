import { useDispatch } from 'react-redux';
import { utilService } from '../../../services/basic/util.service';
import { setModal } from '../../../store/actions/app.actions';
import { useState } from 'react';

export function MoreMembers({ boardMembers, moreMembers, board, element }) {
  const [searchMember, setSearchMember] = useState('');
  const dispatch = useDispatch();

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal));
  };

  // Filter members based on search input
  const filteredMembers = boardMembers.filter(member =>
    member.fullname.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="member-section">
      <div className="search-box">
        <input
          className=""
          type="text"
          placeholder="Search members"
          value={searchMember}
          onChange={(e) => setSearchMember(e.target.value)}
        />
      </div>
      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul>
          {filteredMembers.map((member) => (
            <li
              key={member._id}
              onClick={(ev) =>
                onOpenModal(ev, {
                  element,
                  category: 'member actions',
                  title: 'member actions',
                  props: { element, board, moreMembers, member },
                })
              }
            >
              <div className="member-list">
                {member?.imgUrl ? (
                  <>
                    <span
                      className="member-img"
                      style={{ backgroundImage: `url('${member.imgUrl}')` }}
                    ></span>
                    <span className="member-txt">{`${member.fullname}`}</span>
                  </>
                ) : (
                  <>
                    <span className="member">{utilService.getInitials(member.fullname)}</span>
                    <span className="member-txt">{`${member.fullname}`}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
