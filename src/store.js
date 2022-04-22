import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import reducer from './reducers/reducer.js'

const store = createStore(reducer, applyMiddleware(thunk))

export default store