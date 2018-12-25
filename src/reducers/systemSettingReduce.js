import * as sysActionType from '../constants/systemSettingAtiontType';

/**Sys Default Setting*/
import { setting as initSetting } from '../setting/defaultAntSettings';

/**Routing menu */
import { sysMenusConfig } from '../routes/sysMenusConfig';

/**mock Data*/
import { currentUser as initUser } from '../mock/user';

/**Default Notice */
const initNotice = {
    payload: {
        loading: false,
        notice: initNotice,
    }
}

/**Init locale */
const initLocaleState = {
    lang: 'zh-CN',
    defaultLange: 'zh-CN'
}

/**Init routes */
const initRoutes = {
    routes: sysMenusConfig
}

export const getSystemRoutesReduce = (state = initRoutes, action) => {
    switch (action.type) {
        case sysActionType.GETSYSTEMROUTES:
            return Object.assign({}, state, action.routes);
        default:
            return state;
    }
}

export const changeLocaleReduce = (state = initLocaleState, action) => {
    switch (action.type) {
        case sysActionType.CHANGELOCALE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const currentUserReduce = (state = initUser, action) => {
    switch (action.type) {
        case sysActionType.GETCURRENTUSER:
            return Object.assign({}, state, action.user);
        case sysActionType.UPDATEUSER:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}

export const changeCollapseReduce = (state = { collapsed: false }, action) => {
    switch (action.type) {
        case sysActionType.CHANGECOLLAPSE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const systemSettingReduce = (state = initSetting, action) => {
    switch (action.type) {
        case sysActionType.GETSETTING:
            return Object.assign({}, state, action.setting);
        case sysActionType.UPDATESETTING:
            return Object.assign({}, state, action.setting);
        default:
            return state;
    }
}


export const noticeReduce = (state = initNotice, action) => {
    switch (action.type) {
        case sysActionType.FEATCHINGNOTICE:
            return Object.assign({}, state, action.payload);
        case sysActionType.FEATCHEDNOTICE:
            return Object.assign({}, state, action.payload);
        case sysActionType.CLERANNOTICE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}