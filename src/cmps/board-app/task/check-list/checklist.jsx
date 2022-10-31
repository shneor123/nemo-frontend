import { ChecklistPreview } from './checklist-preview'
import { useDispatch } from 'react-redux';
import { removeChecklist } from '../../../../store/actions/checklist.action'

export const Checklists = ({ task, boardId, groupId, groupTitle }) => {
    const dispatch = useDispatch()

    const onRemoveChecklist = (checklistId) => {
        dispatch(removeChecklist(boardId, groupId, task.id, checklistId))
    }

    return (
        !!task.checklists && <section className="checklist-container">
            {task.checklists.map(checklist =>
                <ChecklistPreview
                    key={checklist.id}
                    checklist={checklist}
                    onRemoveChecklist={onRemoveChecklist}
                    task={task}
                    boardId={boardId}
                    groupId={groupId}
                    groupTitle={groupTitle}

                />)}
        </section>
    )


}