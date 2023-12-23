import { userService } from "../../services/basic/user.service"

let initialState = {}

const guestUser = {
    _id: '1',
    fullname: 'Guest',
    username: 'guest@gmail.com',
    imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
}

initialState = {
    users: [],
    user: userService.getLoggedinUser() || guestUser,
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    let users
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_USER':
            return { ...state, user: action.user ? action.user : guestUser }
        case 'REMOVE_USER':
            users = state.users.filter(user => user._id !== action.userId)
            return { ...state, users }
        case 'SET_WATCHED_USER':
            return { ...state, watchedUser: action.user }
        case 'SET_USER_MSG':
            return { ...state, msg: action.msg }
        case 'UPDATE_USER':
            users = state.users.map(user => user._id === action.user._id ? action.user : user)
            return { ...state, users }

        default:
            return state
    }
}
