import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { utilService } from '../../../services/basic/util.service'
import { removeUser } from '../../../store/actions/user.actions'

export const MembersSide = ({ board, boardId, boardMembers }) => {
  const { users } = useSelector((storeState) => storeState.userModule)
  const { user } = useSelector((storeState) => storeState.userModule)

  const [searchMember, setSearchMember] = useState('')
  const [filterUsers, setFilterUsers] = useState(users)

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterUsers(users.filter((user) => user.fullname.toLowerCase().includes(target.value.toLowerCase())))
  }

  const dispatch = useDispatch()



  return (
    <div className="member-section">
      <div className="search-box">
        <input className="" type="text" placeholder="Search members" value={searchMember} onChange={handleChange} />
      </div>

      <div className="members-box">
        <h4 className="label">Workspace members</h4>
        <ul>
          {filterUsers && filterUsers?.map((user) => user?.imgUrl
            ? <li key={user._id}>
              <a className="member-list">
                <span className="member-img" style={{ backgroundImage: `url('${user.imgUrl}')` }}></span>
                <span className="member-txt">{`${user.fullname}`}</span>
                <button className="remove_board" onClick={dispatch(removeUser(user._id))}>&times;</button>
              </a>
            </li>
            : <li key={user._id}>
              <a className="member-list">
                <span className="member">{utilService.getInitials(user.fullname)}</span>
                <span className="member-txt">{`${user.fullname} `}</span>
                <button className="remove_board" onClick={dispatch(removeUser(user._id))}>&times;</button>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

