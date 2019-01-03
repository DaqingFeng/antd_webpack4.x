import * as actionTypes from '../constants/messageBoxActionType';
import generateGuid from '../utils/generateGuid';

const ShowBox = (type, message, handler) => {
    return dispatch => {
        const hideBoxCallback = (event) => {
            try {
                if (handler) {
                    handler(event);
                }
            } finally {
                dispatch({
                    type: actionTypes.HideMessageBox,
                    payload: {
                        visible: false,
                    }
                })
            }
        };

        return dispatch({
            type: actionTypes.ShowMessageBox,
            payload: {
                id: generateGuid.newGuid(),
                visible: true,
                type,
                message,
                actionHandler: hideBoxCallback
            }
        })
    };
}
export default ShowBox;