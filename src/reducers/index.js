import { combineReducers } from 'redux';
import { changeLocaleReduce, currentUserReduce, getSystemRoutesReduce, systemSettingReduce, noticeReduce, changeCollapseReduce } from './systemSettingReduce';
import messageBoxReduce from './messageBoxReduce';

export const rootReducer = combineReducers({
    messageBoxReduce,
    changeLocaleReduce,
    currentUserReduce,
    getSystemRoutesReduce,
    systemSettingReduce,
    changeCollapseReduce,
    noticeReduce
});

