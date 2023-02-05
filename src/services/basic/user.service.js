import { utilService } from './util.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_ENDPOINT = 'auth'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}


// window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function remove(userId) {
    const user = await httpService.delete(`user/${userId}`)
    return user
}

async function update(user) {
    user = await httpService.put(`user/`, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/login`, userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/signup`, userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post(`${AUTH_ENDPOINT}/logout`)
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

const user = {
    "_id": utilService.makeId(),
    "fullname": "yonatan ben zeev",
    "username": "ybz6@gmail.com",
    "password": "ybz123",
    "imgUrl": "https://unsplash.it/100/100",
    "mentions": [{
        "id": utilService.makeId(),
        "boardId": "m101",
        "taskId": "t101"
    }, {
        "id": utilService.makeId(),
        "boardId": "m102",
        "taskId": "t102"
    }, {
        "id": utilService.makeId(),
        "boardId": "m103",
        "taskId": "t103"
    }, {
        "id": utilService.makeId(),
        "boardId": "m104",
        "taskId": "t104"
    }, {
        "id": utilService.makeId(),
        "boardId": "m105",
        "taskId": "t105"
    }]
}
// storageService.post(STORAGE_KEY_LOGGEDIN_USER, user).then(x => console.log(x))


