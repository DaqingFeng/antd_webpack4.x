import * as actionTypes from '../constants/systemSettingAtiontType';
import cookiesHelper from '../utils/cookiesHelper';
import * as themeSetting from '../setting/defaultAntSettings';
import * as  globalVariables from '../utils/globalVariables';

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
        history.push({
            pathname: '/user/login',
            search: stringify({
                redirect: window.location.href,
            }),
        })
    }
}

export const changeCollapse = (collapsed) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGECOLLAPSE,
            payload: {
                collapsed: collapsed
            }
        })
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
        const settingStr = cookiesHelper.readCookie(globalVariables.ThemeSettingCookieName);
        let setting = themeSetting.defaultSetting;
        if (settingStr) {
            setting = JSON.parse(settingStr);
        }
        dispatch({
            type: actionTypes.GETSETTING,
            setting: setting,
        })
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
        }, 1500);
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