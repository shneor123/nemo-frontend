import { boardService } from "./board.service";
import { utilService } from "../basic/util.service";

export const groupService = {
    saveGroup,
    removeGroup,
    setGroups
}


async function saveGroup(groupTitle, boardId, groupId) {
    if (groupId) {
        let board = await boardService.getById(boardId)
        const idx = board.groups.findIndex(group => groupId === group.id)
        board.groups[idx].title = groupTitle
        boardService.save(board)
        return board
    } else {
        const group = {...groupTitle}
        group.id = utilService.makeId()
        group.tasks = []
        // activity.id = utilService.makeId()
        // activity.createdAt = Date.now()
        const board = await boardService.getById(boardId)
        board.groups.push(group)
        // if (activity) board.activities.unshift(activity)
        boardService.save(board)
        return board
    }
}

async function removeGroup(groupId, boardId) {
    const board = await boardService.getById(boardId)
    const idx = board.groups.findIndex(group => group.id === groupId)
    board.groups.splice(idx, 1)
    boardService.save(board)
    return board
}

async function setGroups(boardId, groups) {
    try {
        const board = await boardService.getById(boardId)
        board.groups = groups
        boardService.save(board)
        return board
    } catch (err) {
        console.log('err', err);
    }
}