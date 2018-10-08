import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import HelloHandler from './controller/hello.js';

let App = React.createClass({
    render() {
        return (
            <div className="nav">
                <Link to="app" className="homelink">Home  </Link>
                <Link to="hello" className="hellolink">  Say Hello</Link>
                {/* this is the importTant part */}
                <RouteHandler />
            </div>
        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="hello" path="/hello" handler={HelloHandler} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});