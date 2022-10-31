import { boardService } from "../../services/board.service.js";
import { socketService } from "../../services/socket.service.js";
import { userService } from "../../services/user.service.js";

// socketService.setup()

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

// var subscriber

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {

            const boardFromDb = await boardService.getById(boardId)
            dispatch(getActionSetBoard(boardFromDb))

            // socketService.off('update-board')
            // console.log('turned socket off');
            // socketService.on('update-board', async (boardFromSocket) => {
            // if (!boardFromSocket) {
            //     console.log('no board from socket');
            //     const boardFromDb = await boardService.getById(boardId)
            //     console.log('boardFromDB', boardFromDb);
            //     dispatch(getActionSetBoard(boardFromDb))
            // } 
            // console.log('board from socket', boardFromSocket);
            // dispatch(getActionSetBoard(boardFromSocket))
            // })
        } catch (err) {
            console.log('Cannot load boards', err)
        }

        // if (subscriber) boardService.unsubscribe(subscriber)
        // subscriber = (ev) => {
        //     console.log('Got notified', ev.data)
        //     dispatch(ev.data)
        // }
        // boardService.subscribe(subscriber)
    }
}

export function loadBoards() {
    return (dispatch) => {
        boardService.query()
            .then(boards => {
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
            })
            .catch(err => {
                console.log('Cannot load boards', err)
            })

        // if (subscriber) boardService.unsubscribe(subscriber)
        // subscriber = (ev) => {
        //     dispatch(ev.data)
        // }
        // boardService.subscribe(subscriber)
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
    console.log('board')
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
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
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