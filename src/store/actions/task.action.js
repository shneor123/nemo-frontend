import { taskService } from "../../services/task.service.js";
import { getActionSetBoard } from "./board.action.js";
export function removeTask(boardId, groupId, taskId, activity) {
    return async (dispatch) => {
        try {
            const board = await taskService.removeTask(boardId, groupId, taskId, activity)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Err could not delete task', err);
        }
    }
}


export function saveTask(task, boardId, groupId, activity) {
    return async (dispatch) => {
        try {
            const board = await taskService.saveTask(task, boardId, groupId, activity)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('err in saving task');
        }
    }
}
export function updateTask(boardId, groupId, taskId, taskToUpdate, activityTxt = null) {
    return async dispatch => {
        try {
            const board = await taskService.saveTask(
                boardId,
                groupId,
                taskId,
                taskToUpdate,
                activityTxt,
            );
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            });
        } catch (err) {
            console.log('Cant update task', err);
        }
    };
}

export function setTasks(boardId, groupId, tasks) {
    return async (dispatch) => {
        try {
            const board = await taskService.setTasks(boardId, groupId, [...tasks])
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('err in saving task')
        }
    }
}


