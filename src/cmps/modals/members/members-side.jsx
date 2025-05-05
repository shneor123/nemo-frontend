import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../../../services/basic/util.service'

export const MembersSide = ({ board, boardId, boardMembers }) => {
  const { users } = useSelector((storeState) => storeState.userModule)

  const [searchMember, setSearchMember] = useState('')
  const [filterUsers, setFilterUsers] = useState(users)

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterUsers(users.filter((user) => user.fullname.toLowerCase().includes(target.value.toLowerCase())))
  }

  return (
      <div className="member-section-side">
        <input className="search-box-side" type="text" placeholder="Search members" value={searchMember} onChange={handleChange} />

        <div className="members-box">
          <h4 className="label">Recently joined</h4>
          <ul>
            {filterUsers && filterUsers?.map((user) => user?.imgUrl
              ? <li key={user._id}>
                <a className="member-list">
                  <span className="member-img" style={{ backgroundImage: `url('${user.imgUrl}')` }}></span>
                  <span className="member-txt">{`${user.fullname}`}</span>
                </a>
              </li>
              : <li key={user._id}>
                <a className="member-list">
                  <span className="member">{utilService.getInitials(user.fullname)}</span>
                  <span className="member-txt">{`${user.fullname} `}</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
  )
}

