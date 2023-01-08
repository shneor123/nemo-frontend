import React from 'react'
import { UserPreview } from './user-preview'

export const UserList = ({ users }) => {
  return (
    <ul className="user-list clean-list">
      {users.map((user, idx) =>
        <UserPreview
          key={idx}
          user={user}
        />
      )}
    </ul>
  )
}