import React, {Component} from 'react';
import subatomic from 'subatomic/styled-components';

import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import Async from './Misc/Async';
import Guard from './Misc/Guard';

const AuthRoute = ({path, component, exact = false}) => <Route path={path} exact={exact} component={Guard(Async(component), {redirectFailed: '/auth'})} />;
const Subatomic = subatomic('element');

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Subatomic>
                    <Switch>
                        {/* ========== Admin =========== */}
                        <AuthRoute path={'/'} exact component={'Admin'} />
                        <AuthRoute path={'/users'} component={'Admin/Users'} />
                        <AuthRoute path={'/roles'} component={'Admin/Roles'} />
                        <AuthRoute path={'/permissions'} component={'Admin/Permissions'} />
                        <AuthRoute path={'/translations'} component={'Admin/Translations'} />

                        {/* ========== User =========== */}
                        <AuthRoute path={'/user/settings'} component={'User'}/>

                        {/* ========== Auth =========== */}
                        <Route path={'/auth'} exact component={Guard(Async('Auth'), {redirectSuccess: '/'})}/>
                        <Route path={`/auth/register`} exact component={Guard(Async('Auth/Register'), {redirectSuccess: '/'})}/>
                        <Route path={`/auth/reset`} exact component={Guard(Async('Auth/Reset'), {redirectSuccess: '/'})}/>
                        <Route path={'/auth/confirm'} exact component={Async('Auth/Confirm')} />

                        {/* ========== Other =========== */}
                        <Route path={`*`} component={Async('Misc/NotFound')}/>
                    </Switch>
                </Subatomic>
            </Router>
        );
    }
}