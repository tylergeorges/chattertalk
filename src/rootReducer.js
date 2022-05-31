import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import reducer, { initialState } from './reducers/reducer';
import {createBrowserHistory} from 'history'
export const history = createBrowserHistory()


const rootReducer = combineReducers({
    router: connectRouter(history),
    store: reducer,
    }
);

export default rootReducer