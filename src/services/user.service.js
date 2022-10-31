import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { utilService } from './util.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_ENDPOINT = 'user'
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
    // return storageService.query('user')
    return httpService.get(`user`)
}

function onUserUpdate(user) {
    // showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user;

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(credentials) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/login`, credentials)

    if (user) {
        // socketService.login(user._id)
        saveLocalUser(user)
        return user

    }
}
async function signup(credentials) {
    // const user = await storageService.post('user', credentials)
    const user = await httpService.post(`${AUTH_ENDPOINT}/signup`, credentials)
    // socketService.login(user._id)
    saveLocalUser(user)
    return user
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post(`${AUTH_ENDPOINT}/logout`)
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}



function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

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


