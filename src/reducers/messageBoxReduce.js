import * as actionTypes from '../constants/messageBoxActionType';
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
        case actionTypes.ShowMessageBox:
            var result = Object.assign(action.payload, {
                visible: true
            });
            return result;
        case actionTypes.HideMessageBox:
            var result = Object.assign({}, state, {
                visible: false
            });
            return result;
        default:
            return state;
    }
}
export default messageBoxReduce;