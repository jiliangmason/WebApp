import userinfoReducer from './reducers_userinfo';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    userinfoReducer,
});

export default rootReducers;


