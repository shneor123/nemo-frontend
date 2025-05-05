import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Activity } from '../cmps/general/activity'
import { ActivityProfile } from '../cmps/general/activityProfile'
import { userService } from '../services/basic/user.service'
import { utilService } from '../services/basic/util.service'
import { onUpdateUser } from '../store/actions/user.actions'

export const UserProfile = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const { board } = useSelector((storeState) => storeState.boardModule)

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

    useEffect(() => {
        // loadActivities()
    }, [])

    const loadActivities = () => {
        // if (!board.activities) return

        // const currActivities = board.activities.filter(activity => activity)
        // setTaskActivities(currActivities)
    }



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

    var activityData = []
    switch (dataType) {
        case 'profile':
            break
        case 'activity':
            // {
            //     taskActivities.forEach((activity) => {
            //         activityData.push(activity.txt)
            //         activityDataCreated.push(activity.createdAt)
            //     })
            // }
            activityData.push(
                <Activity activities={board.activities} boardId={board._id} />
            )
            break
        default:
            break
    }
    return (
        <section className='user-profile'>
            <section className='tabbed-pane-header'>
                <div className='tabbed-pane-header-wrapper u-clearfix'>
                    <div className='top-profile'>
                        <div className='img-fullname-profile '>
                            <div className='root-profile '>
                                {user.imgUrl
                                    ? <div className='img-profile'> <img src={user.imgUrl} className='user-avatar' /> </div>
                                    : <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
                                }
                                <div className='txt-fullname'> <h1>{updatedUser.fullname} <span>@{user.username.match(/^([^@]*)@/)[1]}</span></h1> </div>
                            </div>
                        </div>
                        <div className="profile-btn">
                            <header className="chart-header">
                                <nav className="chart-options">
                                    <button className="btn-profile" disabled={dataType === 'profile'} onClick={() => setDataType('profile')}> Profile and visibility </button>
                                    <button className="btn-profile" disabled={dataType === 'activity'} onClick={() => setDataType('activity')}> Activity </button>
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
                            <div className='presentation'>
                                <span className='nch-icon'>
                                    <span className='word-svg' role='img'>
                                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 18.9291V18C11 17.4477 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V15L5.06227 11.0623C5.0212 11.369 5 11.682 5 12C5 15.5265 7.60771 18.4439 11 18.9291ZM14.9929 5.67024C14.9065 6.69513 14.0472 7.5 13 7.5H11V9C11 9.55228 10.5523 10 10 10H8V12H13C14.1046 12 15 12.8954 15 14V16H16C16.5198 16 16.9469 16.3966 16.9954 16.9037C18.2353 15.6407 19 13.9097 19 12C19 9.20479 17.3617 6.79224 14.9929 5.67024ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                                <span>Always public</span>
                                <p className='style-lorem'>Visible to anyone on the internet, including those that find you through search engines like Google. Edit your username to reflect how you'd like people to see it</p>
                            </div>
                        </div>
                        <div className=''>
                            <input type="text" name="fullname" id="fullname" value={updatedUser.fullname} onChange={onInputChange} required />
                        </div>

                        <div className='div-username'>
                            <label htmlFor="fullname">Bio</label>
                            <div className='presentation'>
                                <span className='nch-icon'>
                                    <span className='word-svg' role='img'>
                                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 18.9291V18C11 17.4477 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V15L5.06227 11.0623C5.0212 11.369 5 11.682 5 12C5 15.5265 7.60771 18.4439 11 18.9291ZM14.9929 5.67024C14.9065 6.69513 14.0472 7.5 13 7.5H11V9C11 9.55228 10.5523 10 10 10H8V12H13C14.1046 12 15 12.8954 15 14V16H16C16.5198 16 16.9469 16.3966 16.9954 16.9037C18.2353 15.6407 19 13.9097 19 12C19 9.20479 17.3617 6.79224 14.9929 5.67024ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                                <span>Always public</span>
                                <p className='style-lorem'>Visible to anyone on the internet, including those that find you through search engines like Google. Edit your username to reflect how you'd like people to see it</p>
                            </div>
                        </div>
                        <div className=''>
                            <textarea rows="3" value={user.mentions} onChange={onInputChange}></textarea>
                        </div>
                        <button className='main-btn'>Save</button>
                    </form>
                </div>
            </section>
            }
            {dataType === 'activity' && <section className='dataType-activity'>
                <div>
                    <span className='activity-icon trellicons activity-icon large'></span>
                    <span>Activiy</span>
                </div>
                <div className='activityq'>
                    <ActivityProfile activities={board.activities} boardId={board._id} />

                </div>
            </section>}
        </section >
    )
}