const { Modal, Button } = antd;

export default class messageBox extends React.Component {
    render() {
        const { setModalVisible, modalIsVisible } = this.props;
        return (
            <div>
                <Modal
                    title="20px to Top"
                    style={{ top: 20 }}
                    visible={modalIsVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}