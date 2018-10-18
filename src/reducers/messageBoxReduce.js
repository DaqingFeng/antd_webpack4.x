import { ShowMessageBox, HideMessageBox } from '../constants/messageBoxActionType';
import * as enums from '../utils/Enums';

let initState = {
    payload: {
        type: enums.messageBoxType.SUCCESS,
        message: "",
        visalbe: false,
        handler: null
    }
}

const messageBoxReduce = (state = initState, action) => {
    switch (action.type) {
        case ShowMessageBox:
            var result = Object.assign(action.payload, {
                visible: true
            });
            return result;
        case HideMessageBox:
            var result = Object.assign({}, state, {
                visible: false
            });
            return result;
        default:
            return state;
    }
}
export default messageBoxReduce;