import { boardService } from "../../services/board.service.js";
import { labelService } from "../../services/label.service.js";
import { taskService } from "../../services/task.service.js";
import { getActionSetBoard } from "./board.action.js";


export function toggleLabel(boardId, groupId, taskId, labelId, activity) {
    return async (dispatch) => {
        try {
            const task = await labelService.toggleLabel(boardId, groupId, taskId, labelId, activity)
            const board = await taskService.saveTask(task, boardId, groupId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not delete task', err);
        }
    }
}

export function toggleLabelPreview(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            board.labelOpenState = !board.labelOpenState
            boardService.save(board)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not toggle label preview', err);
        }
    }
}
export function saveLabel(boardId, labels) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            board.labels = labels
            boardService.save(board)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not toggle label preview', err);
        }
    }
}
