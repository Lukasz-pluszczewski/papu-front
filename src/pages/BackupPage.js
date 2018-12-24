import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import stringify from 'javascript-stringify';

import BackupForm from '../components/BackupForm/BackupForm';

import request from '../services/request';
import notification from '../services/notificationService';
import { getAction, connect } from '../services/reduxBreeze';

import Layout from '../components/Layout/Layout';

class HomePage extends Component {
  static propTypes = {
  };

  state = {
    backup: null,
  };

  componentDidMount() {
    request.makeRequest('get', '/backup')
      .then(backup => this.setState({ backup }))
      .catch(() => notification.error('Getting backup data error!', 'Could not get backup data. Try again later.'));
  }

  sendFile = formData => {
    return request.sendFormData('/backup', formData)
      .catch(() => notification.error('Getting backup data error!', 'Could not get backup data. Try again later.'));
  };

  render() {
    return (
      <Layout
        breadcrumbs={['Home', 'Backup']}
      >
        <BackupForm backup={this.state.backup} sendFile={this.sendFile} />

      </Layout>
    );
  }
}

export default connect()(HomePage);
