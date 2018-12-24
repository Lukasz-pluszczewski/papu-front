import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import stringify from 'javascript-stringify';

import { SUPPER, BREAKFAST, SNACK, DINNER } from '../../constants/recipeTypes';
import RecipeForm from '../RecipeForm/RecipeFormEdit';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import RecipesSidebarItem from './RecipesSidebarItem';
import { Modal, List, Select } from 'antd';

import './RecipesSidebar.scss';

const { Option } = Select;

class RecipesSidebar extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    deleteRecipe: PropTypes.func,
    loadRecipes: PropTypes.func,

    recipeSaving: PropTypes.bool,
    parseRecipeLoading: PropTypes.bool,
    parsedRecipe: PropTypes.object,
    parseRecipe: PropTypes.func,
    save: PropTypes.func,
  };

  state = {
    recipeOpened: null,
    modalVisible: false,
    recipeType: null,
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

  handleTypeChange = type => {
    const query = {};
    if (!_.isNil(type)) {
      query.type = type;
    }
    this.props.loadRecipes(query);
  };

  renderItem = item => (
    <RecipesSidebarItem
      item={item}
      onDelete={this.handleDelete}
      onRecipeClick={this.openModal}
    />
  );

  renderHeader = () => {

    return (
      <div className="RecipesSidebar__header">
        <h4 className="RecipesSidebar__headerTitle">Recipes</h4>
        <Select
          showSearch
          className="RecipesSidebar__headerTypeSelect"
          placeholder="Any type"
          optionFilterProp="children"
          onChange={this.handleTypeChange}
        >
          <Option value={null}>Any type</Option>
          <Option value={BREAKFAST}>Breakfast</Option>
          <Option value={SNACK}>Snack</Option>
          <Option value={DINNER}>Dinner</Option>
          <Option value={SUPPER}>Supper</Option>
        </Select>
      </div>
    );
  };

  render() {
    const modalVisible = this.state.modalVisible;
    const recipeOpened = this.state.recipeOpened
      ? {
        id: this.state.recipeOpened._id,
        title: this.state.recipeOpened.title,
        ingredients: this.state.recipeOpened.ingredients,
        recipe: this.state.recipeOpened.recipe,
        type: this.state.recipeOpened.type,
      }
      : {};

    return (
      <React.Fragment>
        <List
          className="RecipesSidebar"
          header={this.renderHeader()}
          dataSource={this.props.recipes}
          renderItem={this.renderItem}
          loading={this.props.loading}
        />
        <Modal
          title="Edit recipe"
          visible={modalVisible}
          confirmLoading={false}
          onCancel={this.handleCancelModal}
          footer={null}
        >
          <RecipeForm
            loading={this.props.recipeSaving}
            parsing={this.props.parseRecipeLoading}
            save={this.props.save}
            parsedRecipe={this.props.parsedRecipe}
            parseRecipe={this.props.parseRecipe}
            id={recipeOpened.id}
            title={recipeOpened.title}
            ingredients={recipeOpened.ingredients}
            recipe={recipeOpened.recipe}
            type={recipeOpened.type}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecipesSidebar;
