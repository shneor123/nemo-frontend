import { useEffect, useState } from "react"
import { utilService } from "../../services/basic/util.service"

export const ActivityProfile = ({ activities, taskId, boardId }) => {
    const [taskActivities, setTaskActivities] = useState(null)

    useEffect(() => {
        loadActivities()
    }, [activities]);

    const loadActivities = () => {
        if (!activities) return

        const currActivities = activities.filter(activity => activity?.task?.id === taskId)
        setTaskActivities(currActivities)
    }

    return (
        <section className="activity-container-profile">
            {taskActivities && activities && < div className="activity-preview-container">
                {taskId ? taskActivities.map((activity) => {
                    return (
                        activity.txt ? <div key={activity.id} className='activity-preview'>
                            <div className="avatar-member"
                                style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}
                                >
                            </div>
                            <div className='activity-info'>
                                <h2 > <span className="activity-name">{activity.byMember?.fullname}</span> {activity.txt} </h2>
                                <p>{utilService.timeSince(activity.createdAt)}</p>
                            </div>
                        </div> : <div key={activity.id} className='activity-preview'>
                            <div className="avatar-member"
                                style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}
                                >
                            </div>
                            <div className="comment-info">
                                <h2> <span className="activity-name">{activity.byMember?.fullname}</span> <span className="time">{utilService.timeSince(activity.createdAt)}</span></h2>
                                <div className="comment-container"><span className="comment-content">{activity.comment}</span></div>
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
                                <h2 > <span className="activity-name">{activity.byMember?.fullname}</span> {activity.boardTxt} </h2>
                                <p>{utilService.timeSince(activity.createdAt)}</p>
                            </div>
                        </div> : <div key={activity.id} className='activity-preview'>
                            <div className="avatar-member"
                                style={{ background: `url(${activity.byMember?.imgUrl}) center center / cover ` }}>
                            </div>
                            <div className="comment-info">
                                <h2> <span className="activity-name">{activity.byMember?.fullname}</span> <span className="time">{utilService.timeSince(activity.createdAt)}</span></h2>
                                <div className="comment-preview">{activity.comment}</div>
                            </div>

                        </div>
                    )
                })}
            </div>
            }
        </section >
    )
}


