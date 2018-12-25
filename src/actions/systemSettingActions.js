import cookiesHelper from '../utils/cookiesHelper';
import * as  globalVariables from '../utils/globalVariables';
import * as sysActionType from '../constants/systemSettingAtiontType';


export const changelocale = (lang) => {
    return dispatch => {
        dispatch({
            type: sysActionType.CHANGELOCALE,
            payload: {
                lang: lang,
            }
        })
    }
};

export const changeCollapse = (collapsed) => {
    return dispatch => {
        dispatch({
            type: sysActionType.CHANGECOLLAPSE,
            payload: {
                collapsed: collapsed
            }
        })
    }
};

export const getCurrentUser = (currentUser) => {
    return dispatch => {
        dispatch({
            type: sysActionType.GETCURRENTUSER,
            user: {
                currentUser: currentUser,
            }
        })
    }
};

export const getSystemSetting = () => {
    return dispatch => {
        const settingStr = cookiesHelper.readCookie(globalVariables.ThemeSettingCookieName);
        if (!settingStr) {
            return;
        }
        const setting = JSON.parse(settingStr);
        dispatch({
            type: sysActionType.GETSETTING,
            setting: setting,
        })
    }
};


export const updateSystemSetting = (setting) => {
    return dispatch => {
        dispatch({
            type: sysActionType.UPDATESETTING,
            setting: setting,
        })
    }
};

/**Default Notice */
import { notice as initNotice } from '../mock/notice';
export const getNotice = () => {
    return dispatch => {
        dispatch({
            type: sysActionType.FEATCHINGNOTICE,
            payload: {
                loading: true,
                notice: [],
            }
        });
        //Get Notice
        setTimeout(() => {
            dispatch({
                type: sysActionType.FEATCHEDNOTICE,
                payload: {
                    loading: false,
                    notice: initNotice,
                }
            });
        }, 1500);

    }
};


export const clearnNotice = () => {
    return dispatch => {
        dispatch({
            type: sysActionType.FEATCHINGNOTICE,
            payload: {
                loading: true,
            }
        });

        setTimeout(() => {
            dispatch({
                type: sysActionType.CLERANNOTICE,
                payload: {
                    loading: false,
                    notice: [],
                }
            });
        }, 1500);

    }
};