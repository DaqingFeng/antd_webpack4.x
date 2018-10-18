import React, { Component } from 'react';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import ShowBox from './actions/messageBoxActions';

import { rootReducer } from './reducers';
import Home from './views/homePage';
import MessageBox from './components/MessageBox';


/** Redux Store */
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { messagebox } = this.props;
        return (
            <div className="nav">
                <MessageBox  {...messagebox} visible={messagebox.visible || false} />
                <Home />
            </div>
        );
    }
}

const Main = connect(
    state => ({
        messagebox: state.messageBoxReduce || {},
    }),
    dispatch => ({
        actions: bindActionCreators(ShowBox, dispatch)
    }),
)(App)

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
)
