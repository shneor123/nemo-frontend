const initialState = {
    board: null,
    boards: [],
    filterBy: {
        txt: '',
        labelIds: [],
        members: []
    }
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARD':
            // implement map over boards and replace new board *** needs to test if this works
            boards = state.boards.map(board => {
                return (board._id === action.board._id) ? action.board : board
            })
            newState = { ...state, board: { ...action.board }, boards }
            // newState = { ...state, board: action.board }

            break
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break
        case 'SET_FILTERBY':
            newState = { ...state, filterBy: action.filterBy }
        default:
    }

    return newState

}
