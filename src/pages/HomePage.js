import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import notification from '../services/notificationService';
import { getAction, connect } from '../services/reduxBreeze';

import Layout from '../components/Layout/Layout';
import RecipesSidebar from '../components/RecipesSidebar/RecipesSidebar';
import RecipeForm from '../components/RecipeForm/RecipeForm';

class HomePage extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    parsedRecipe: PropTypes.object,
    sidebarRecipeType: PropTypes.number,
    recipeSaving: PropTypes.bool,
    recipesLoading: PropTypes.bool,
    recipeDeleting: PropTypes.bool,
    parseRecipeLoading: PropTypes.bool,
    getRecipes: PropTypes.func,
    saveRecipe: PropTypes.func,
    parseRecipe: PropTypes.func,
    deleteRecipe: PropTypes.func,
    setRecipeType: PropTypes.func,
  };

  componentDidMount() {
    if (!this.props.recipes.length) {
      this.load();
    }
  }

  save = (recipe, success) => {
    this.props.saveRecipe(
      recipe,
      {
        success: () => {
          this.load();

          notification.success('Successfully saved', `"${recipe.title}" recipe has been saved`);

          if (success) {
            success();
          }
        },
        error: () => {
          notification.error('Saving failed!', 'Your recipe has not been saved. Try again.');
        },
      }
    );
  };

  load = ({ type, ingredient } = {}) => {
    if (ingredient) {
      notification.error('Searching by ingredient not implemented yet!');
    }
    if (_.isUndefined(type)) {
      type = this.props.sidebarRecipeType;
    }
    this.props.getRecipes({ type }, {
      error: () => {
        notification.error('Fetching recipes failed!', 'Your recipes could not be loaded. Try reloading the page.');
      },
    });
  };

  deleteRecipe = recipe => {
    this.props.deleteRecipe(
      recipe._id,
      {
        success: () => {
          this.load();

          notification.success('Successfully deleted', `"${recipe.title}" recipe has been deleted`);
        },
        error: () => {
          notification.error('Deleting failed!', 'Your recipe has not been deleted. Try again.');
        },
      }
    );
  };

  parseRecipe = _.debounce(recipe => {
    this.props.parseRecipe(recipe);
  }, 1000);

  render() {
    const isLoading = this.props.recipesLoading || this.props.recipeDeleting;

    return (
      <Layout
        sider={<RecipesSidebar
          recipes={this.props.recipes}
          loadRecipes={this.load}
          loading={isLoading}
          deleteRecipe={this.deleteRecipe}
          sidebarRecipeType={this.props.sidebarRecipeType}
          setRecipeType={this.props.setRecipeType}

          recipeLoading={this.props.recipeSaving}
          parsing={this.props.parseRecipeLoading}
          save={this.save}
          parsedRecipe={this.props.parsedRecipe}
          parseRecipe={this.parseRecipe}
        />}
        breadcrumbs={['Home']}
      >
        <RecipeForm
          loading={this.props.recipeSaving}
          parsing={this.props.parseRecipeLoading}
          save={this.save}
          parsedRecipe={this.props.parsedRecipe}
          parseRecipe={this.parseRecipe}
        />
      </Layout>
    );
  }
}

export default connect(
  {
    recipesLoading: 'recipes.pending.getRecipes',
    recipeSaving: 'recipes.pending.saveRecipe',
    recipeDeleting: 'recipes.pending.deleteRecipe',
    recipes: 'recipes.result.getRecipes',
    parseRecipeLoading: 'recipes.pending.parseRecipe',
    parsedRecipe: 'recipes.result.parseRecipe',
    sidebarRecipeType: 'recipes.sidebarRecipeType',
  },
  {
    getRecipes: getAction('getRecipes'),
    saveRecipe: getAction('saveRecipe'),
    parseRecipe: getAction('parseRecipe'),
    deleteRecipe: getAction('deleteRecipe'),
    setRecipeType: getAction('setRecipeType'),
  }
)(HomePage);
