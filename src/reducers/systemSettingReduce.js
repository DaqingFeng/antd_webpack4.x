import * as sysActionType from '../constants/systemSettingAtiontType';

import * as extensionFun from './systemSettingReduceExtFunc';

/**Routing menu */
import { sysMenusConfig } from '../routes/sysMenusConfig';

/**Sys Default Setting*/
import { defaultSetting as initSetting } from '../setting/defaultAntSettings';

/**mock Data*/
import { currentUser as initUser } from '../mock/user';

/**Default Notice */
export const initNotice = {
    payload: {
        loading: false,
        notice: initNotice,
    }
}

/**Init locale */
export const initLocaleState = {
    lang: 'zh-CN',
    defaultLange: 'zh-CN'
}


export const getSystemRoutesReduce = (state = { routes: sysMenusConfig }, action) => {
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
            /**Change Theme */
            const { primaryColor, contentWidth } = action.setting;
            if (state.primaryColor !== primaryColor) {
                extensionFun.updateTheme(primaryColor);
            }
            /**Change Size*/
            if (state.contentWidth !== contentWidth && window.dispatchEvent) {
                window.dispatchEvent(new Event('resize'));
            }
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