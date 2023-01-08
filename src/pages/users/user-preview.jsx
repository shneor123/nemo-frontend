import React from 'react'
import { NavLink } from 'react-router-dom'

export const UserPreview = ({ user }) => {

    return (
        <li className="user-preview">
            <section className='details'>
                <p>{user.fullname}</p>
            </section>
            {/* <section className='buttons'>
                <NavLink className='sub-btn center-text' to={`/users/${user._id}`}>{t("users_edit")}</NavLink>
                <NavLink className='sub-btn center-text' to={`/users/edit/${user._id}`}>{t("users_details")}</NavLink>
                <button className='sub-btn center-text' onClick={() => onAdminClick(user._id, user.isAdmin, user.fullname)}>
                    {user.isAdmin ? t("users_edit_admin_remove") : t("users_edit_admin_set")}
                </button>
                <button className='sub-btn center-text' onClick={() => onDeleteClick(user._id, user.fullname)}>{t("users_delete")}</button>
            </section> */}
       
        </li>
    )
}