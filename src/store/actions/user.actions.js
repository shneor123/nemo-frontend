import { userService } from '../../services/basic/user.service'

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function loadUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }
}

export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function signup(credentials) {
    return async dispatch => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}

export function onUpdateUser(user) {
    return async (dispatch) => {
        try {
            user = await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user })
        } catch (err) {
            console.error('Error on updating user', err)
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: 'User removed successfully' } }))
        } catch (err) {
            console.error('Error on loading users', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed removing user' } }))
        }
    }
}

export function setUserMsg(msg) {
    return (dispatch) => {
        dispatch({ type: 'SET_USER_MSG', msg })
    }
}