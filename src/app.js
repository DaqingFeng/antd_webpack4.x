import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HelloHandler from './controller/hello.js';

class App extends Component {
    render() {
        return (
            <div className="nav">
                <HelloHandler />
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
