import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { onLogout } from '../../../store/actions/user.actions'
import { setModal } from '../../../store/actions/app.actions'
import { utilService } from '../../../services/basic/util.service'

export const AccountActions = ({ user }) => {
  console.log("🚀 ~ file: account-actions.jsx:9 ~ AccountActions ~ user", user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(onLogout())
    dispatch(setModal(null))
    navigate('/')
  }

  const sendToLoginSignup = (path) => {
    dispatch(setModal(null))
    navigate(path)
  }

  return (
    <section className="account-actions">
      <div className="account-info">
        <div className="account-img-container">
          {user?.imgUrl ? (
            <img src={user.imgUrl} alt={user.fullname} className="account-img" />
          ) : (
            <a className="account">{utilService.getInitials(user.fullname)}</a>
          )}
        </div>
        <div className="credentials">
          <h2 className="fullname">{user.fullname}</h2>
          <h3 className="username">{user.username}</h3>
        </div>
      </div>
      <Link to={`users/${user._id}`} className="Link login-btn" onClick={() => dispatch(setModal(null))}>
        Edit Profile
      </Link>
      <hr />
      {user._id === '1' ? (
        <>
          <button className="login-btn" onClick={() => sendToLoginSignup('/login')}>
            Log in
          </button>
          <button className="signup-btn" onClick={() => sendToLoginSignup('/signup')}>
            Sign up
          </button>
        </>
      ) : (
        <button className="logout-btn" onClick={logoutUser}>
          Log out
        </button>
      )}
    </section>
  )
}
