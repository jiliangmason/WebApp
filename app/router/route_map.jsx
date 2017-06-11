import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import City from '../containers/City/city';
import Details from '../containers/Details/details';
import Home from '../containers/Home/home';
import Search from '../containers/Search/search';
import Login from '../containers/Login/login';
import User from '../containers/User/user';
import NotFound from '../containers/notfound';
import App from '../containers/App';

export default class RouterMap extends React.Component{
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/city" component={City}/>
                    <Route path="/details/:id" component={Details}/>
                    <Route path="/search/:category(/:keyword)" component={Search}/>
                    <Route path="/login(/:router)" component={Login}/>
                    <Route path="/user" component={User}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}