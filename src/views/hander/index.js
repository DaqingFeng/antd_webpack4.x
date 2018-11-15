import { Layout } from 'antd';
import { Component } from 'react';
const { Header, Footer, Sider, Content } = Layout;

class headerLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return
        (
            <Header>Header</Header>
        );
    }
}

export default headerLayout;