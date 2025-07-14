import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './reducers/app.reducer.js'
import { boardReducer } from './reducers/board.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    appModule: appReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


