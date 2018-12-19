import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Breadcrumb } from 'antd';

import './Layout.scss';

const { Content, Sider, Footer } = Layout;

class PageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    sider: PropTypes.node,
    breadcrumbs: PropTypes.arrayOf(PropTypes.string),
    siderWidth: PropTypes.number,
  };
  static defaultProps = {
    siderWidth: 300,
  };

  render() {
    return (
      <Layout className="Layout">
        {this.props.sider
          ? (
            <Sider
              className="Layout__sider"
              width={this.props.siderWidth}
              breakpoint="lg"
              collapsedWidth="0"
            >
              {this.props.sider}
            </Sider>
          )
          : null}
        <Layout className="Layout__layout">
          {this.props.breadcrumbs
            ? (
              <Breadcrumb className="Layout__breadcrumb">
                {this.props.breadcrumbs.map(breadcrumb => (<Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>))}
              </Breadcrumb>
            )
            : null}
          <Content className="Layout__contentContainer">
            <div className="Layout__content">
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Papu © 2018 Created by Łukasz Pluszczewski
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;