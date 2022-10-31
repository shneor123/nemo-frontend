import { memberService } from "../../services/member.service";
import { taskService } from "../../services/task.service";
import { getActionSetBoard } from "./board.action";

export function toggleMember(boardId, groupId, taskId, user) {
    return async (dispatch) => {
        try {
            const task = await memberService.toggleMember(boardId, groupId, taskId, user)
            const board = await taskService.saveTask(task, boardId, groupId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('could not toggle member', err);
        }

    }
}


export function joinTask(boardId, groupId, taskId, user) {
    return async (dispatch) => {
        try {
            const task = await memberService.joinTask(boardId, groupId, taskId, user)
            const board = await taskService.saveTask(task, boardId, groupId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('could not toggle member', err);
        }

    }
}

