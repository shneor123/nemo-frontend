import { TaskDetailsMainCmps } from './task-details-main-cmps.jsx'
import { DataGutter } from './data-gutter.jsx'

export const TaskDetailsMain = ({ board, task, boardId, groupId, labels, activities, groupTitle, boardMembers }) => {
    return (
        <div className="task-details-main">
            <DataGutter board={board} boardId={boardId} groupId={groupId} task={task} labels={labels} boardMembers={boardMembers} />
            <TaskDetailsMainCmps task={task} boardId={boardId} groupId={groupId} activities={activities} groupTitle={groupTitle} />
        </div>
    )
}


