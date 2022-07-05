import { storageService } from './async-storage.service'
import { store } from '../store/store'
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



function getUsers() {
    return httpService.get(`user`)
}

function onUserUpdate(user) {
    store.dispatch({ type: 'SET_WATCHED_USER', user })
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}
function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(credentials) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/login`, credentials)

    if (user) {
        saveLocalUser(user)
        return user

    }
}
async function signup(credentials) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/signup`, credentials)
    saveLocalUser(user)
    return user
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


