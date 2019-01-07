import { combineReducers } from 'redux';
import * as sysReduce from './systemSettingReduce';

export const rootReducer = combineReducers(
    {
        changeLocaleReduce:sysReduce.changeLocaleReduce,
        changeCollapseReduce: sysReduce.changeCollapseReduce,
        currentUserReduce: sysReduce.currentUserReduce,
        getSystemRoutesReduce: sysReduce.getSystemRoutesReduce,
        systemSettingReduce: sysReduce.systemSettingReduce,
        changeCollapseReduce: sysReduce.changeCollapseReduce,
        noticeReduce: sysReduce.noticeReduce,
        SystemLoginInfoReduce: sysReduce.SystemLoginInfoReduce,
        SystemSubmittingReduce: sysReduce.SystemSubmittingReduce
    });

