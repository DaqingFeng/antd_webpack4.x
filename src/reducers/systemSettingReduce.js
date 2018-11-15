import { CHANGELOCALE } from '../constants/systemSettingAtiontType';

const initLocaleState = {
    lang: 'zh-CN',
    defaultLange: 'zh-CN'
}

export const changeLocaleReduce = (state = initLocaleState, action) => {
    switch (action.type) {
        case CHANGELOCALE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}