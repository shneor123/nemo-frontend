import { boardService } from "./board.service"
import { taskService } from "./task.service"
import { utilService } from "./util.service"


export const checklistService = {
    removeChecklist,
    saveChecklist,
    saveTodo,
    removeTodo
}

async function removeChecklist(boardId, groupId, taskId, checklistId, activity) {
    const taskToUpdate = await taskService.getTaskById(boardId, groupId, taskId)
    const updateChecklists = taskToUpdate.checklists.filter(checklist => checklistId !== checklist.id)
    taskToUpdate.checklists = updateChecklists
    return taskService.saveTask(taskToUpdate, boardId, groupId, activity)
}
async function saveChecklist(checklist, boardId, groupId, taskId, activity) {
    if (activity) {
        activity.id = utilService.makeId()
        activity.createdAt = Date.now()
        activity.task = { id: taskId, title: checklist.title }
    }
    const checklistId = checklist.id
    const taskToUpdate = await taskService.getTaskById(boardId, groupId, taskId)
    const checklistIdx = taskToUpdate.checklists.findIndex(checklist => checklistId === checklist.id)
    if (checklistIdx === -1) taskToUpdate.checklists.push(checklist)
    else taskToUpdate.checklists[checklistIdx] = checklist
    return await taskService.saveTask(taskToUpdate, boardId, groupId, activity)
}
async function saveTodo(todo, checklistId, boardId, groupId, taskId, activity) {
    if (activity) {
        activity.id = utilService.makeId()
        activity.createdAt = Date.now()
        activity.task = { id: taskId, title: todo.title }
    }
    const todoId = todo.id
    const taskToUpdate = await taskService.getTaskById(boardId, groupId, taskId)
    const checklistIdx = taskToUpdate.checklists.findIndex(checklist => checklistId === checklist.id)
    const todoIdx = taskToUpdate.checklists[checklistIdx].todos.findIndex(todo => todoId === todo.id)
    if (todoIdx < 0 || !todoIdx && todoIdx !== 0) taskToUpdate.checklists[checklistIdx].todos.push(todo)
    else taskToUpdate.checklists[checklistIdx].todos[todoIdx] = todo
    return taskService.saveTask(taskToUpdate, boardId, groupId, activity)
}
async function removeTodo(todo, checklistId, boardId, groupId, taskId) {
    const todoId = todo.id
    const taskToUpdate = await taskService.getTaskById(boardId, groupId, taskId)
    const checklistIdx = taskToUpdate.checklists.findIndex(checklist => checklistId === checklist.id)
    const todoIdx = taskToUpdate.checklists[checklistIdx].todos.findIndex(todo => todoId === todo.id)
    taskToUpdate.checklists[checklistIdx].todos.splice(todoIdx, 1)
    return taskService.saveTask(taskToUpdate, boardId, groupId)
}


