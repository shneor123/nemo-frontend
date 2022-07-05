import { checklistService } from "../../services/checklist.service.js";
import { getActionSetBoard } from "./board.action.js";

export function removeChecklist(boardId, groupId, taskId, checklistId, activity) {
    return async (dispatch) => {
        try {
            const board = await checklistService.removeChecklist(boardId, groupId, taskId, checklistId, activity)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not delete task', err);
        }
    }
}
export function saveChecklist(checklist, boardId, groupId, taskId, activity) {
    return async (dispatch) => {
        try {
            const board = await checklistService.saveChecklist(checklist, boardId, groupId, taskId, activity)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not save checklist', err);
        }
    }
}
export function saveTodo(todo, checklistId, boardId, groupId, taskId, activity) {
    return async (dispatch) => {
        try {
            const board = await checklistService.saveTodo(todo, checklistId, boardId, groupId, taskId, activity)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not save todo', err);
        }
    }
}
export function removeTodo(todo, checklistId, boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            const board = await checklistService.removeTodo(todo, checklistId, boardId, groupId, taskId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not delete task', err);
        }
    }
}
