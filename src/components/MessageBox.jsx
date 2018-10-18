import { Modal } from 'antd';

/**MessageBox Component*/
const MessageBox = ({
    type,
    visible,
    message,
    actionHandler,
    ...other
}) => {
    return (
        <div>
            <Modal
                {...other}
                title="20px to Top"
                style={{ top: 20 }}
                visible={visible}
                onOk={() => actionHandler(true)}
                onCancel={() => actionHandler(false)}>
                <p>{message}</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    );
}
export default MessageBox;