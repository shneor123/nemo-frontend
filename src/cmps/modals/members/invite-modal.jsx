import { useState } from "react";
import { utilService } from "../../../services/basic/util.service";
import { boardService } from "../../../services/board/board.service";
import { BsCheck2 } from 'react-icons/bs'


export const InviteModal = ({ users, board, deleteMemberFromBoard }) => {
  const [searchMember, setSearchMember] = useState('')
  const [filterUsers, setFilterUsers] = useState(users)
  const [updatedBoard, setBoardMembers] = useState(board)

  if (!board) return
  if (!users) return

  const onToggle = (id) => {
    const boardMemberIdx = updatedBoard.members.findIndex((member) => member._id === id)
    const userIdx = users.findIndex((user) => user._id === id)
    const isBoardMember = updatedBoard.members.some((member) => member._id === id)

    isBoardMember
      ? updatedBoard.members.splice(boardMemberIdx, 1)
      : updatedBoard.members.push(
        users[userIdx]?.imgUrl
          ? {
            _id: users[userIdx]._id,
            username: users[userIdx].username,
            fullname: users[userIdx].fullname,
            imgUrl: users[userIdx].imgUrl,
          }
          : { _id: users[userIdx]._id, username: users[userIdx].username, fullname: users[userIdx].fullname }
      )
    const newBoard = { ...updatedBoard }
    onUpdateBoard(newBoard)
    setBoardMembers(newBoard)
  }

  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterUsers(users.filter((user) => user.fullname.toLowerCase().includes(target.value.toLowerCase())))
  }


  return (
    <div className="member-section">
      <div className="search-box">
        <input className="" type="text" placeholder="Search members" value={searchMember} onChange={handleChange} />
      </div>

      <div className="members-box">
        <h4 className="label">Workspace members</h4>
        <ul className="">
          {filterUsers &&
            filterUsers?.map((user) =>
              user?.imgUrl ? (
                <li key={user._id}
                  onClick={() => {
                    onToggle(user._id)
                    deleteMemberFromBoard(user._id)
                  }}
                >
                  <a className="member-list">
                    <span className="member-img" style={{ backgroundImage: `url('${user.imgUrl}')` }}></span>
                    <span className="member-txt">{`${user.fullname} (${user.username.match(/^([^@]*)@/)[1]})`}</span>
                    {updatedBoard.members && updatedBoard.members.some((boardMember) => boardMember._id === user._id) && (
                      <span className="member-icon">
                        <BsCheck2 />
                      </span>
                    )}
                  </a>
                </li>
              ) : (
                <li
                  key={user._id}
                  onClick={() => {
                    onToggle(user._id)
                    deleteMemberFromBoard(user._id)
                  }}
                >
                  <a className="member-list">
                    <span className="member">{utilService.getInitials(user.fullname)}</span>
                    <span className="member-txt">{`${user.fullname} (${user.username.match(/^([^@]*)@/)[1]})`}</span>
                    {updatedBoard.members && updatedBoard.members.some((boardMember) => boardMember._id === user._id) && (
                      <span className="member-icon">
                        <BsCheck2 />
                      </span>
                    )}
                  </a>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  )
}
