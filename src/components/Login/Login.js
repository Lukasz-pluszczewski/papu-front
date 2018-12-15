import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout/Layout';
import { Input, Button, Card } from 'antd';

import './Login.scss';

class Login extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    password: '',
  };

  handlePasswordChange = e => this.setState({ password: e.target.value });

  handleSave = () => {
    localStorage.setItem('password', this.state.password);
    this.forceUpdate();
  };

  render() {
    const password = localStorage.getItem('password');

    if (password) {
      return this.props.children;
    }
    return (
      <Layout
        breadcrumbs={['Login']}
      >
        <div className="Login">
          <Card className="Login__card">
            <Input className="Login__input" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
            <Button className="Login__button" type="primary" onClick={this.handleSave}>Save</Button>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default Login;
