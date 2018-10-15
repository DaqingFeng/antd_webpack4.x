import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './views/homePage/index';
import commonFunc from './utils/commonFunc';


class App extends Component {
    render() {
        const dateTimeNow = commonFunc.getNowFormatDate();
        return (
            <div className="nav">
                <Home />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
