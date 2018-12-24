import React, { Component, Suspense, lazy } from 'react';

import Login from '../Login/Login';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Layout, Menu, Icon, Button } from 'antd';

import './App.scss';

const { Header } = Layout;

// lazy loaded routes
const HomePage = lazy(() => import(
  /* webpackChunkName: "HomePage" */
  '../../pages/HomePage'
));
const PlanPage = lazy(() => import(
  /* webpackChunkName: "HomePage" */
  '../../pages/PlanPage'
));
const BackupPage = lazy(() => import(
  /* webpackChunkName: "BackupPage" */
  '../../pages/BackupPage'
  ));

class App extends Component {

  removePassword = () => {
    localStorage.setItem('password', '');
    this.loginRef.forceUpdate();
  };

  render() {
    let activePage;

    switch(window.location.pathname) {
      case '/plan':
        activePage = 'plan';
        break;
      case '/backup':
        activePage = 'backup';
        break;
      default:
        activePage = 'home';
    }

    return (
      <Router>
        <Layout>
          <Header className="header">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[activePage]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="home">
                <Link to="/"><Icon type="home" />Home</Link>
              </Menu.Item>
              <Menu.Item key="plan">
                <Link to="/plan"><Icon type="align-left" />Plan</Link>
              </Menu.Item>
              <Menu.Item key="backup">
                <Link to="/backup"><Icon type="align-left" />Backup</Link>
              </Menu.Item>
            </Menu>
            <Button
              className="App__logout"
              type="primary"
              shape="circle"
              icon="logout"
              onClick={this.removePassword}
            />
          </Header>
          <Login ref={el => this.loginRef = el}>
            <Suspense fallback={<Loading withLayout/>}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={HomePage}
                />
                <Route
                  exact
                  path="/plan"
                  component={PlanPage}
                />
                <Route
                  exact
                  path="/backup"
                  component={BackupPage}
                />
              </Switch>
            </Suspense>
          </Login>
        </Layout>
      </Router>
    );
  }
}

export default App;
