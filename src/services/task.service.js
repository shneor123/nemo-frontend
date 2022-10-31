import { boardService } from "./board.service"
import { utilService } from "./util.service"

export const taskService = {
    removeTask,
    getTaskById,
    saveTask,
    setTasks
}
window.ts = taskService;


async function saveTask(task, boardId, groupId, activity) {
    if (task.id) {
        let board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => groupId === group.id)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(currTask => currTask.id === task.id)
        board.groups[groupIdx].tasks[taskIdx] = task
        if (activity) board.activities.unshift(activity)
        board = await boardService.save(board)
        return board
    } else {
        task.id = utilService.makeId()
        task.attachments = []
        task.labelIds = []
        task.checklists = []
        task.style = {}
        task.members = []
        task.coverSize = 'uncover'
        task.description = ''
        activity.id = utilService.makeId()
        activity.createdAt = Date.now()
        activity.task = { id: task.id, title: task.title }
        const board = await boardService.getById(boardId)
        board.activities.unshift(activity)
        const idx = board.groups.findIndex(group => groupId === group.id)
        board.groups[idx].tasks.push(task)
        boardService.save(board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
        return board
    }
}



async function removeTask(boardId, groupId, taskId, activity) {
    //TODO: add try catch

    const board = await boardService.getById(boardId)
    const groupIdx = board.groups.findIndex(group => groupId === group.id)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => taskId === task.id)
    board.groups[groupIdx].tasks.splice(taskIdx, 1)

    // board.activities.unshift(activity)
    boardService.save(board)
    return board
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => groupId === group.id)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => taskId === task.id)
        return board.groups[groupIdx].tasks[taskIdx]
    } catch (err) {
        console.log(err);
    }
}


async function setTasks(boardId, groupId, tasks) {
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => groupId === group.id)
        board.groups[groupIdx].tasks = tasks
        boardService.save(board)
        return board
    } catch (err) {
        console.log(err);
    }
}



function getImgsFromTask(task) {
    let imgs = []
    if (task.attachments) {
        task.attachments.forEach((attach) => {
            if (attach.isImg) {
                imgs.push(attach)
            }
        })
    }
    if (imgs.length <= 0) return null
    return imgs
}

