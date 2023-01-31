import { boardService } from "../../services/board/board.service";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}
export function getActionSetBoard(board) {
    return {
        type: 'SET_BOARD',
        board
    }
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const boardFromDb = await boardService.getById(boardId)
            dispatch(getActionSetBoard(boardFromDb))
        } catch (err) {
            console.log('Cannot load boards', err)
        }
    }
}

export function loadBoards() {
    return (dispatch) => {
        boardService.query()
            .then(boards => {
                dispatch({ type: 'SET_BOARDS', boards })
            })
            .catch(err => {
                console.log('Cannot load boards', err)
            })
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch(getActionRemoveBoard(boardId))
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return (dispatch) => {
        boardService.save(board)
            .then(savedBoard => {
                dispatch(getActionAddBoard(savedBoard))
            })
            .catch(err => {
                console.log('Cannot add board', err)
            })
    }
}

export function updateBoard(board) {
    return (dispatch) => {
        boardService.save(board)
            .then(savedBoard => {
                console.log('Updated Board:', savedBoard);
                dispatch(getActionUpdateBoard(savedBoard))
            })
            .catch(err => {
                console.log('Cannot save board', err)
            })
    }
}

export function saveBg(boardId, color) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.getById(boardId)
            savedBoard.style.background = color
            boardService.save(savedBoard)
            dispatch(getActionSetBoard(savedBoard))
        } catch (err) {
            console.log('err in saving task');
        }
    }
}

export function setFilter(filterBy) {
    console.log("🚀 ~ file: board.action.js:102 ~ setFilter ~ filterBy", filterBy)
    return (dispatch) => {
        return dispatch({ type: 'SET_FILTERBY', filterBy, })
    }
}


export function addUserToBoard(boardId, user) {
    console.log('boardId', boardId);
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            console.log(board);
            board.members.push(user)
            const savedBoard = await boardService.save(board)
            dispatch(getActionSetBoard(savedBoard))
        } catch (err) {
            console.log('err adding user to board members: ', err);
        }

    }
}

// Demo for Optimistic Mutation (IOW - Assuming the server call will work,
//  so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_BOARD',
            boardId
        })

        boardService.remove(boardId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                console.log('Cannot load boards', err)
                dispatch({
                    type: 'UNDO_REMOVE_BOARD',
                })
            })
    }
}


export function handleDrag(
    board,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
) {
    console.log('board start', board._id);
    return async dispatch => {
        if (type === 'group') {
            // take out group from old index
            const group = board.groups.splice(droppableIndexStart, 1);
            // insert group to new index
            board.groups.splice(droppableIndexEnd, 0, ...group);
        } else {
            // Moving task in the same group
            if (droppableIdStart === droppableIdEnd) {
                const group = board.groups.find(group => group.id === droppableIdStart);
                const task = group.tasks.splice(droppableIndexStart, 1);
                group.tasks.splice(droppableIndexEnd, 0, ...task);
            } else {
                // Moving task between differents groups // CR: also refactor name
                // if (droppableIdStart !== droppableIdEnd) {
                // Find the group where drag happened
                const groupStart = board.groups.find(group => group.id === droppableIdStart);

                // Pull out task from this group
                const task = groupStart.tasks.splice(droppableIndexStart, 1);

                // Find the group where drag ended
                const groupEnd = board.groups.find(group => group.id === droppableIdEnd);

                // Put the task in the new group
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...task);
            }
            // }
        }
        console.log(board._id);
        const savedBoard = await boardService.save(board);

        dispatch({
            type: 'SAVE_BOARD',
            board: savedBoard,
        });
    };
}