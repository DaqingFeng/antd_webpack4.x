import { combineReducers } from 'redux';
import messageBoxReduce from '../reducers/messageBoxReduce';

export  const rootReducer = combineReducers({
    messageBoxReduce,
});

