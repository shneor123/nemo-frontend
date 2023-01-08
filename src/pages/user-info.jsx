import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUsers } from "../store/actions/user.actions"

export const UsersInfo = () => {
    const { users } = useSelector((storeState) => storeState.userModule)
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUsers(null))
    }, [])

    console.log(selectedUser)
    if (!users) return <></>
    return (
        <section className="users-container">
            <div className="user-inf">users: {users.length}</div>
            <h2>Users:</h2>
            <div className="user-info">
                {users.map((user) =>
                    <div onClick={() => setSelectedUser(user)} key={user._id}
                        className={`user-preview ${selectedUser?._id === user._id ? 'selected' : ''}`}>
                            <div className="user-img-container">
                                <img src={user?.imgUrl} />
                            </div>
                        <h2>{user.fullname}</h2>
                    </div>)}
            </div>

        </section >
    )
}