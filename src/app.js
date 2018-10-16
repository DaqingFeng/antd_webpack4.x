import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import Home from './views/homePage/index';
import commonFunc from './utils/commonFunc';
import modeDailog from './components/messageBox';

class App extends Component {
    render() {
        const { setModalVisible } = this.props;
        const dateTimeNow = commonFunc.getNowFormatDate();
        return (
            <div className="nav">
                <modeDailog setModalVisible={setModalVisible} />
                <Home />
            </div>
        );
    }
}

App.props.setModalVisible


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
