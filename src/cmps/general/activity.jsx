import { useEffect, useState } from "react"
import { IoListOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { utilService } from "../../services/util.service";
import { saveActivity } from "../../store/actions/activity.action";


export const Activity = ({ activities, taskId, boardId }) => {
    const [taskActivities, setTaskActivities] = useState(null)
    const [toggleShow, setToggleShow] = useState(true)
    const [activityComment, setActivityComment] = useState({ comment: '' })
    const [isEditOpen, setIsEditOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        loadActivities()
    }, [activities]);



    const loadActivities = () => {
        if (!activities) return

        const currActivities = activities.filter(activity => activity?.task?.id === taskId)
        setTaskActivities(currActivities)
    }

    const handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        setActivityComment({ [field]: value });
    }



    const onSaveActivity = () => {

        const activity = activityComment
        activity.task = {}
        activity.task.id = taskId
        dispatch(saveActivity(activity, boardId))
        setActivityComment({ comment: '' })
    }


    return <section className="activity-container">

        <div className={`title-container ${taskId ? '' : 'menu'}`}>
            <IoListOutline className="activity-icon" /> <h3>Activity</h3>
            {taskId && <button className="details-btn"
                onClick={() => setToggleShow(!toggleShow)} >
                {toggleShow ? 'Hide details' : 'Show details'}
            </button>}
        </div>
        {taskId && <div className="text-area-continer">
            <textarea
                onClick={() => setIsEditOpen(true)}
                name='comment'
                className="activity-input"
                placeholder="Write a comment..."
                value={activityComment.comment}
                onChange={handleChange}
                onBlur={() => setIsEditOpen(false)}
            >

            </textarea>
            {isEditOpen &&
                <button className={`save-activity ${activityComment.comment ? 'active' : ''} `}
                    onMouseDown={onSaveActivity}>Save</button>
            }
        </div>}


        {taskActivities && activities && toggleShow && < div className="activity-preview-container">
            {taskId ? taskActivities.map((activity) => {
                return (
                    activity.txt ? <div key={activity.id} className='activity-preview'>
                        <div className="avatar-member"
                            style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}>
                        </div>
                        <div className='activity-info'>
                            <h2 > <span>{activity.byMember?.fullname}</span> {activity.txt} </h2>
                            <p>{utilService.timeSince(activity.createdAt)}</p>
                        </div>
                    </div> : <div key={activity.id} className='activity-preview'>
                        <div className="avatar-member"
                            style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}>
                        </div>
                        <div className="comment-info">
                            <h2> <span>{activity.byMember?.fullname}</span> <span className="time">{utilService.timeSince(activity.createdAt)}</span></h2>
                            <div className="comment-preview">{activity.comment}</div>
                        </div>

                    </div>
                );
            }) : activities.map((activity) => {
                return (
                    activity.boardTxt ? <div key={activity.id} className='activity-preview'>
                        <div className="avatar-member"
                            style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}>
                        </div>
                        <div className='activity-info'>
                            <h2 > <span>{activity.byMember?.fullname}</span> {activity.boardTxt} </h2>
                            <p>{utilService.timeSince(activity.createdAt)}</p>
                        </div>
                    </div> : <div key={activity.id} className='activity-preview'>
                        <div className="avatar-member"
                            style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}>
                        </div>
                        <div className="comment-info">
                            <h2> <span>{activity.byMember?.fullname}</span> <span className="time">{utilService.timeSince(activity.createdAt)}</span></h2>
                            <div className="comment-preview">{activity.comment}</div>
                        </div>

                    </div>
                );
            })}

        </div>
        }

    </section >
}

// taskId ? taskActivities : activities.map((activity)

// taskId ? taskActivities :