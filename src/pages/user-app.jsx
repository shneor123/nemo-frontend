import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserList } from './users/user-list'

import { loadUsers } from '../store/actions/user.actions'

export const UserApp = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(storeState => storeState.userModule)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    if (!users) return "lod"
    return (
        <section className="user-app main-layout">
            <h2 className='page-header'>Users</h2>
            <UserList users={users}/>
        </section>
    )
}