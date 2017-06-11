import userinfoReducer from './reducers_userinfo';
import {storeReducer} from './reducers_store';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    userinfoReducer,
    storeReducer
});

export default rootReducers;


