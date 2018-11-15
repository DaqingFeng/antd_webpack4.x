import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

/*react Locale */
import ConnectedIntlProvider from './locales/index';

/*Redux Store */
import store, { history } from './appStore/index';

/**System Routes */
import sysRoutes, { routesConfig } from './routes/sysRoutes';

/**Layout */
import BasicLayout from './views/layouts/BasicLayout';

/**Sys Default Setting*/
import { setting } from './setting/defaultAntSettings';

/**Routes*/
const switchRoutes = (
    <Switch>
        {sysRoutes.map(
            (prop, key) => {
                return prop.redirect ? (
                    <Redirect from={prop.path} to={prop.to} key={key} />
                ) : (
                        <Route path={prop.path} component={prop.component} key={key} />
                    )
            }
        )}
    </Switch>
);


/**App*/
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <BasicLayout routes={routesConfig}
                setting={setting}
                pathname={history.location.pathname}>
            </BasicLayout>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('app')
)
