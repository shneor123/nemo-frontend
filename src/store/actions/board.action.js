import { userService } from "../../services/basic/user.service";
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
    return async (dispatch) => {
        try {
            const boards = await boardService.query();
            console.log('board',boards);
            const currentUser = userService.getLoggedinUser();
            if (currentUser) {
                const filteredBoards = boards.filter(board => {
                    return board.createdBy._id === currentUser._id || board.members.some(member => member._id === currentUser._id);
                });
                dispatch({ type: 'SET_BOARDS', boards: filteredBoards });
            } else {
                dispatch({ type: 'SET_BOARDS', boards });
            }
        } catch (err) {
            console.log('Cannot load boards', err);
        }
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


export function savedBoard(board, boardId) {
    return async (dispatch) => {
        try {
            const boardTitle = await boardService.save(board, boardId)
            dispatch(getActionUpdateBoard(boardTitle))
        } catch (err) {
            console.log('err in saving task')
        }
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

export function onRemoveBoardOptimistic(boardId) {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_BOARD', boardId })
        boardService.remove(boardId)
            .then(() => { console.log('Server Reported - Deleted Succesfully') })
            .catch(err => {
                console.log('Cannot load boards', err)
                dispatch({ type: 'UNDO_REMOVE_BOARD' })
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
    console.log('🎯 handleDrag → board:', board?._id);

    return async (dispatch) => {
        // הגנה בסיסית
        if (!board || !board.groups) {
            console.error('🚨 Invalid board data');
            return;
        }

        // העברת רשימות (groups)
        if (type === 'group') {
            const movedGroup = board.groups.splice(droppableIndexStart, 1);
            board.groups.splice(droppableIndexEnd, 0, ...movedGroup);
        } else {
            // העברת משימה
            if (!droppableIdStart || !droppableIdEnd) {
                console.warn('🚫 Missing droppableId');
                return;
            }

            const groupStart = board.groups.find(group => group.id === droppableIdStart);
            const groupEnd = board.groups.find(group => group.id === droppableIdEnd);

            if (!groupStart || !groupEnd) {
                console.error('🚨 Could not find source or destination group');
                return;
            }

            // באותה רשימה
            if (droppableIdStart === droppableIdEnd) {
                const movedTask = groupStart.tasks.splice(droppableIndexStart, 1);
                groupStart.tasks.splice(droppableIndexEnd, 0, ...movedTask);
            } else {
                // בין רשימות שונות
                const movedTask = groupStart.tasks.splice(droppableIndexStart, 1);
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...movedTask);
            }
        }

        try {
            const savedBoard = await boardService.save(board);

            dispatch({
                type: 'SAVE_BOARD',
                board: savedBoard,
            });

            console.log('✅ Board saved after drag:', savedBoard._id);
        } catch (err) {
            console.error('❌ Failed to save board after drag', err);
        }
    };
}
