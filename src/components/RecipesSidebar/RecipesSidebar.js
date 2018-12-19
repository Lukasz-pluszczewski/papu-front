import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stringify from 'javascript-stringify';

import RecipesSidebarItem from './RecipesSidebarItem';
import { Modal, List } from 'antd';

import './RecipesSidebar.scss';

class RecipesSidebar extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    deleteRecipe: PropTypes.func,
  };

  state = {
    recipeOpened: null,
    modalVisible: false,
  };

  openModal = recipe => {
    this.setState({ modalVisible: true, recipeOpened: recipe });
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

  handleDelete = item => {
    this.props.deleteRecipe(item);
  };

  render() {
    const modalVisible = this.state.modalVisible;

    return (
      <React.Fragment>
        <List
          className="RecipesSidebar"
          header={<div><h4>Recipes</h4></div>}
          dataSource={this.props.recipes}
          renderItem={
            item => (
              <RecipesSidebarItem
                item={item}
                onDelete={this.handleDelete}
                onRecipeClick={this.openModal}
              />
            )
          }
          loading={this.props.loading}
        />
        <Modal
          title={this.state.recipeOpened && this.state.recipeOpened.title}
          visible={modalVisible}
          onOk={this.handleOkModal}
          confirmLoading={false}
          onCancel={this.handleCancelModal}
        >
          <pre>{stringify(this.state.recipeOpened && this.state.recipeOpened.title, null, 2)}</pre>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecipesSidebar;
