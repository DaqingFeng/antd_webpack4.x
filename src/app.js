import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Hello from './views/homePage/hello';
import commonFunc from './utils/commonFunc';

class App extends Component {
    render() {
        const dateTimeNow = commonFunc.getNowFormatDate();
        return (
            <div className="nav">
                <Hello />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
