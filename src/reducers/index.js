import { combineReducers } from 'redux';
import messageBoxReduce from './messageBoxReduce';
import {
    changeLocaleReduce,
    currentUserReduce,
    getSystemRoutesReduce,
    systemSettingReduce,
    noticeReduce,
    changeCollapseReduce
} from './systemSettingReduce';

export const rootReducer = combineReducers({
    messageBoxReduce,
    changeLocaleReduce,
    currentUserReduce,
    getSystemRoutesReduce,
    systemSettingReduce,
    changeCollapseReduce,
    noticeReduce
});

