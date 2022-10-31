import { EditBtn } from "./edit-btn"
import { EditText } from "./edit-text"

export const EditPreview = ({ onRemoveTask, closeQuickEdit, task, onOpenTaskDetails, labelsTo, groupId, boardId, boardMembers, onCloseQuickEdit }) => {


    return (
        <>
            <div className="edit-preview-container">
                <EditBtn
                    onOpenTaskDetails={onOpenTaskDetails}
                    onRemoveTask={onRemoveTask}
                    labels={labelsTo}
                    closeQuickEdit={closeQuickEdit}
                    task={task}
                    groupId={groupId}
                    boardId={boardId}
                    boardMembers={boardMembers}

                />
                <EditText task={task} boardId={boardId} groupId={groupId} onCloseQuickEdit={onCloseQuickEdit}
                />


            </div>
            <div className="edit-preview" onClick={closeQuickEdit}></div>
        </>
    )
}