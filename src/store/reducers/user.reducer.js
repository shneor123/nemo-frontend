import { userService } from '../../services/user.service.js'

// console.log('userService', userService)

let initialState = {}

initialState = {
    users: [],
    user: null,
    watchedUser: null
}


// const initialState = {
//     users: [],
//     user: userService?.getLoggedinUser() || {},
//     watchedUser: null
// }

export function userReducer(state = initialState, action) {
    var newState = state;
    var user
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        default:
    }

    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
