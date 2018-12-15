import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import stringify from 'javascript-stringify';

import { Popconfirm, Modal, Icon, List } from 'antd';

import './RecipesSidebar.scss';

class RecipesSidebar extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  };

  state = {
    recipeOpened: null,
    modalVisible: false,
  };

  openModal = recipeId => {
    this.setState({ modalVisible: true, recipeOpened: recipeId });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  handleCancelModal = () => {
    this.closeModal();
  };

  handleOkModal = () => {
    this.closeModal();
  };

  render() {
    const modalVisible = this.state.modalVisible;
    const activeRecipe = _.find(this.props.recipes, { _id: this.state.recipeOpened }) || {};

    return (
      <React.Fragment>
        <List
          className="RecipesSidebar"
          header={<div><h4>Recipes</h4></div>}
          dataSource={this.props.recipes}
          renderItem={
            item => (
              <List.Item>
                <Popconfirm placement="topLeft" title="Are you sure you want to delete this recipe?" onConfirm={null} okText="Delete" cancelText="Cancel">
                  <Icon className="RecipesSidebar__remove-recipe-icon" type="close" />
                </Popconfirm>
                <a onClick={() => this.openModal(item._id)}>{item.title}</a>
              </List.Item>
            )
          }
          loading={this.props.loading}
        />
        <Modal
          title={activeRecipe.title}
          visible={modalVisible}
          onOk={this.handleOkModal}
          confirmLoading={false}
          onCancel={this.handleCancelModal}
        >
          <pre>{stringify(activeRecipe, null, 2)}</pre>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecipesSidebar;
