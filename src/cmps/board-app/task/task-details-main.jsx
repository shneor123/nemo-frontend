import { TaskDetailsMainCmps } from './task-details-main-cmps.jsx'
import { DataGutter } from './data-gutter.jsx'

export const TaskDetailsMain = ({ task, boardId, groupId, labels, activities, groupTitle }) => {
    return <div className="task-details-main">
        <DataGutter boardId={boardId} groupId={groupId} task={task} labels={labels} />
        <TaskDetailsMainCmps task={task} boardId={boardId} groupId={groupId} activities={activities} groupTitle={groupTitle} />
    </div>
}


