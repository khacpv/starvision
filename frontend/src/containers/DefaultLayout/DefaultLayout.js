import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import * as router from 'react-router-dom';
import {Container} from 'reactstrap';

import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import {authService, customerService} from "../../services/index";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault();
        authService.logout();
        this.props.history.push('/login')
    }

    componentDidMount() {
        customerService.searchCustomer('', '')
            .then(result => {})
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="app" style={{ width: '1600px' }}>
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader onLogout={e => this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes} router={router}/>
                        <Container fluid style={{ padding: '0px 10px 0px 10px'}}>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )}/>
                                        ) : (null);
                                    })}
                                    {/*<Redirect from="/" to="/dashboard"/>*/}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

export default DefaultLayout;
