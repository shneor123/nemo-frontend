import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { userService } from '../services/basic/user.service'
import { onUpdateUser } from '../store/actions/user.actions'

export const UserProfile = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    console.log("🚀 ~ file: user-profile.jsx:9 ~ UserProfile ~ user", user)
    const [updatedUser, setUpdatedUser] = useState({ fullname: '' })
    const [dataType, setDataType] = useState('profile')
    const dispatch = useDispatch()
    const params = useParams()


    useEffect(() => {
        (async function () {
            const user = await userService.getById(params.id)
            setUpdatedUser({ ...updatedUser, _id: params.id, username: user.username, fullname: user.fullname })
        })()
    }, [params])

    const onInputChange = ({ target: { name, value } }) => {
        setUpdatedUser({ ...updatedUser, [name]: value })
    }

    const onSubmit = async (ev) => {
        // ev.preventDefault()
        const user = {
            _id: updatedUser._id,
            username: updatedUser.username,
            fullname: updatedUser.fullname
        }
        try {
            const savedUser = await userService.update(user)
            dispatch(onUpdateUser(savedUser))
        } catch (err) {
            console.log('err', err)
            return
        }
    }

    return (
        <section className='user-profile'>
            <section className='tabbed-pane-header'>
                <div className='tabbed-pane-header-wrapper u-clearfix'>
                    <div className='top-profile'>
                        <div className='img-fullname-profile '>
                            <div className='root-profile '>
                                <div className='img-profile'> <img src={user.imgUrl} className='user-avatar' /> </div>
                                <div className='txt-fullname'> <h1>{updatedUser.fullname} <span>@{user.username.match(/^([^@]*)@/)[1]}</span></h1> </div>
                            </div>
                        </div>
                        <div className="profile-btn">
                            <header className="chart-header">
                                <nav className="chart-options">
                                    <button className="btn-profile" disabled={dataType === 'profile'} onClick={() => setDataType('profile')}> Profile and visibility </button>
                                </nav>
                            </header>
                        </div>
                    </div>
                </div>
            </section>

            {dataType === 'profile' && <section className='dataType-profile'>
                <img className='svg-profile' src="https://a.trellocdn.com/prgb/assets/eff3d701a9c3a71105ea.svg" alt="" />
                <h1 className='h1-profile'>Manage your personal information</h1>
                <div className='lorem-profile'>
                    <p>This is an Atlassian account. Edit your personal information and visibility settings through your <a href="#"> Atlassian profile.</a></p>
                    <p> To learn more, view our <a href="#">Terms of Service</a> or <a href="#">Privacy Policy.</a></p>
                </div>
                <h3>About</h3> <hr className='hr' />

                <div className='from-submit-profile'>
                    <form onSubmit={onSubmit}>
                        <div className='div-username'>
                            <label htmlFor="fullname">Username</label>
                            <div className='presentation'> <span>Always public</span></div>
                        </div>
                        <div className=''>
                            <input type="text" name="fullname" id="fullname" value={updatedUser.fullname} onChange={onInputChange} required />
                        </div>

                        {/* <div className='div-username'>
                            <label htmlFor="fullname">Bio</label>
                            <div className='presentation'> <span>Always public</span></div>
                        </div>
                        <div className=''>
                            <textarea rows="3" value={user.mentions} onChange={onInputChange}></textarea>
                        </div> */}
                        <button className='main-btn'>Save</button>
                    </form>
                </div>
            </section>
            }
        </section >
    )
}