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
    recipeSaving: PropTypes.bool,
    recipesLoading: PropTypes.bool,
    parseRecipeLoading: PropTypes.bool,
    getRecipes: PropTypes.func,
    saveRecipe: PropTypes.func,
    parseRecipe: PropTypes.func,
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

  load = () => {
    this.props.getRecipes(null, {
      error: () => {
        console.log('error');
        notification.error('Fetching recipes failed!', 'Your recipes could not be loaded. Try reloading the page.');
      },
    });
  };

  parseRecipe = _.debounce((recipe) => {
    this.props.parseRecipe(recipe);
  }, 1000);

  render() {
    return (
      <Layout
        sider={<RecipesSidebar recipes={this.props.recipes} loading={this.props.recipesLoading} />}
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
    recipes: 'recipes.result.getRecipes',
    parseRecipeLoading: 'recipes.pending.parseRecipe',
    parsedRecipe: 'recipes.result.parseRecipe',
  },
  {
    getRecipes: getAction('getRecipes'),
    saveRecipe: getAction('saveRecipe'),
    parseRecipe: getAction('parseRecipe'),
  }
)(HomePage);
