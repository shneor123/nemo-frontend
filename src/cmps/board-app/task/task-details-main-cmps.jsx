import { Description } from "./task-description"
import { Checklists } from "./check-list/checklist"
import { TaskAttachment } from './attachment/task-attachment'
import { Activity } from '../../general/activity'


export const TaskDetailsMainCmps = ({ task, boardId, groupId, activities, groupTitle }) => {
    return <>
        {/* will only have one description and one activity */}
        {/* checklist and attachment need to render the amount that exists from model */}
        <Description task={task} boardId={boardId} groupId={groupId} />
        {<TaskAttachment task={task} boardId={boardId} groupId={groupId} />}
        <Checklists task={task} boardId={boardId} groupId={groupId} groupTitle={groupTitle} />
        {/* <Attachment/> */}
        <Activity activities={activities} taskId={task.id} boardId={boardId} />
    </>
}
