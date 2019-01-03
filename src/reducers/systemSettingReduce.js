import * as actionsType from '../constants/systemSettingAtiontType';

import * as extensionFunc from './systemSettingReduceExt';

/**Routing menu */
import { sysMenusConfig } from '../routes/sysMenusConfig';

/**Sys Default Setting*/
import { defaultSetting as initSetting } from '../setting/defaultAntSettings';

/**mock User Data*/
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
        case actionsType.GETSYSTEMROUTES:
            return Object.assign({}, state, action.routes);
        default:
            return state;
    }
}

export const changeLocaleReduce = (state = initLocaleState, action) => {
    switch (action.type) {
        case actionsType.CHANGELOCALE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const currentUserReduce = (state = initUser, action) => {
    switch (action.type) {
        case actionsType.GETCURRENTUSER:
            return Object.assign({}, state, action.user);
        case actionsType.UPDATEUSER:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}

export const changeCollapseReduce = (state = { collapsed: false }, action) => {
    switch (action.type) {
        case actionsType.CHANGECOLLAPSE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const systemSettingReduce = (state = initSetting, action) => {
    switch (action.type) {
        case actionsType.GETSETTING:
            return Object.assign({}, state, action.setting);
        case actionsType.UPDATESETTING:
            /**Change Theme */
            const { primaryColor, contentWidth } = action.setting;
            if (state.primaryColor !== primaryColor) {
                extensionFunc.updateTheme(primaryColor);
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
        case actionsType.FEATCHINGNOTICE:
            return Object.assign({}, state, action.payload);
        case actionsType.FEATCHEDNOTICE:
            return Object.assign({}, state, action.payload);
        case actionsType.CLERANNOTICE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}