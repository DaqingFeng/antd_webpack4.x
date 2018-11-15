import { combineReducers } from 'redux';
import messageBoxReduce from './messageBoxReduce';
import { changeLocaleReduce } from './systemSettingReduce';

export const rootReducer = combineReducers({
    messageBoxReduce,
    changeLocaleReduce
});

