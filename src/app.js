import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

/*react Locale */
import ConnectedIntlProvider from './locales/index';

/*Redux Store */
import store, { history } from './appStore/index';

/**System Routes */
import Routes from './routes/sysRoutes';

/**App*/
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <ConnectedRouter history={history}>
                {renderRoutes(Routes)}
            </ConnectedRouter>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <App />
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('app')
)