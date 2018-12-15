import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout/Layout';
import { Icon } from 'antd';

import './Loading.scss';

class Loading extends Component {
  static propTypes = {
    withLayout: PropTypes.bool,
  };

  render() {
    const loadingIcon = (
      <div className="LoadingIcon__iconContainer">
        <Icon className="LoadingIcon__icon" type="loading" />
      </div>
    );
    if (this.props.withLayout) {
      return (
        <Layout>
          {loadingIcon}
        </Layout>
      );
    }
    return loadingIcon;
  }
}

export default Loading;