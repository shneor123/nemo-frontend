import { EditBtn } from "./edit-btn"
import { EditText } from "./edit-text"

export const EditPreview = ({ board, onRemoveTask, closeQuickEdit, task, onOpenTaskDetails, labelsTo, groupId, boardId, boardMembers, onCloseQuickEdit ,isPreviewEnd}) => {
    return (
        <>
            <div className="edit-preview-container">
                <EditBtn
                    onOpenTaskDetails={onOpenTaskDetails}
                    onRemoveTask={onRemoveTask}
                    labels={labelsTo}
                    closeQuickEdit={closeQuickEdit}
                    board={board}
                    task={task}
                    groupId={groupId}
                    boardId={boardId}
                    boardMembers={boardMembers}
                    onCloseQuickEdit={onCloseQuickEdit}
                />
                <EditText task={task} boardId={boardId} groupId={groupId} onCloseQuickEdit={onCloseQuickEdit}isPreviewEnd={isPreviewEnd}/>
            </div>
            <div className="edit-preview" onClick={closeQuickEdit}></div>
        </>
    )
}