import { Modal } from 'antd';
import * as enums from '../../utils/Enums';

/**MessageBox Component*/
const MessageBox = ({
    type,
    title,
    message,
    visible,
    content,
    actionHandler,
    ...other
}) => {
    var msgDom = (
        <div>
            <Modal
                {...other}
                title={title}
                visible={visible}
                onOk={() => actionHandler(true)}
                onCancel={() => actionHandler(false)}>
                <p>{message}</p>
            </Modal>
        </div>
    );
    return msgDom;
}
export default MessageBox;