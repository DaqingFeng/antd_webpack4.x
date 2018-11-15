import { CHANGELOCALE } from '../constants/systemSettingAtiontType';

export const Changelocale = (lang) => {
    return dispatch => {
        dispatch({
            type: CHANGELOCALE,
            payload: {
                lang: lang,
            }
        })
    }
};