import { Description } from "./task-description"
import { Checklists } from "./check-list/checklist"
import { TaskAttachment } from './attachment/task-attachment'
import { Activity } from '../../general/activity'


export const TaskDetailsMainCmps = ({ task, boardId, groupId, activities, groupTitle }) => {
    return <>
        <Description task={task} boardId={boardId} groupId={groupId} />
        {<TaskAttachment task={task} boardId={boardId} groupId={groupId} />}
        <Checklists task={task} boardId={boardId} groupId={groupId} groupTitle={groupTitle} />
        <Activity activities={activities} taskId={task.id} boardId={boardId} />
    </>
}
