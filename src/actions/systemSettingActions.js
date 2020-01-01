import { history } from '../appStore'
import * as actionTypes from '../constants/systemSettingAtiontType';
import cookiesHelper from '../utils/cookiesHelper';
import * as authorityHelper from '../utils/authority';
import * as themeSetting from '../setting/defaultAntSettings';
import * as  globalVariables from '../utils/globalVariables';
import * as extensionFunc from './systemSettingActionsExt';

export const changelocale = (lang) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGELOCALE,
            payload: {
                lang: lang,
            }
        })
    }
};

export const systemLogOut = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.SYSTEMLOGOUT,
        });
        authorityHelper.setUserAuthority("guest");
        history.push({
            pathname: '/user/login',
            search: '?redirect=' + encodeURIComponent(window.location.href),
        });
    }
}

export const systemLogIn = (userInfo) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SYSTEMLOGINSUBMITTING,
            loading: true,
        })
        dispatch({
            type: actionTypes.SYSTEMLOGIN,
            payload: {
                userInfo: userInfo,
            }
        });
        extensionFunc.loginInSystem(userInfo);
        authorityHelper.setUserAuthority("admin");
        setTimeout(() => {
            dispatch({
                type: actionTypes.SYSTEMLOGINSUBMITTING,
                loading: false,
            })
        }, 2000);
    }
}

export const changeCollapse = (collapsed) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGECOLLAPSE,
            payload: {
                collapsed: collapsed
            }
        });
    }
};

export const getCurrentUser = (currentUser) => {
    return dispatch => {
        dispatch({
            type: actionTypes.GETCURRENTUSER,
            user: {
                currentUser: currentUser,
            }
        })
    }
};

export const getSystemSetting = () => {
    return dispatch => {
        const settingStr = cookiesHelper.readCookie(globalVariables.ThemeSettingCookieKey);
        let setting = themeSetting.defaultSetting;
        if (settingStr) {
            setting = JSON.parse(settingStr);
        }
        dispatch({
            type: actionTypes.GETSETTING,
            setting: setting,
        });
    }
};


export const updateSystemSetting = (setting) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATESETTING,
            setting: setting,
        })
    }
};

/**Default Notice */
import { notice as initNotice } from '../mock/notice';
export const getNotice = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.FEATCHINGNOTICE,
            payload: {
                loading: true,
                notice: [],
            }
        });
        //Get Notice
        setTimeout(() => {
            dispatch({
                type: actionTypes.FEATCHEDNOTICE,
                payload: {
                    loading: false,
                    notice: initNotice,
                }
            });
        }, 500);
    }
};


export const clearnNotice = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.FEATCHINGNOTICE,
            payload: {
                loading: true,
            }
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLERANNOTICE,
                payload: {
                    loading: false,
                    notice: [],
                }
            });
        }, 1500);
    }
};