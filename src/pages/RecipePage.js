import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getAction, connect } from '../services/reduxBreeze';

import Layout from '../components/Layout/Layout';
import RecipesSidebar from '../components/RecipesSidebar/RecipesSidebar';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import { Breadcrumb, Input, Card, Icon, Collapse, List, Tooltip } from 'antd';

const { Panel } = Collapse;
const { Content, Sider } = Layout;
const { TextArea } = Input;

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
    this.load();
  }

  save = (recipe, success) => {
    this.props.saveRecipe(
      recipe,
      {
        success: () => {
          this.load();
          if (success) {
            success();
          }
        },
      }
    );
  };

  load = () => {
    this.props.getRecipes();
  };

  parseRecipe = _.debounce((recipe) => {
    this.props.parseRecipe(recipe);
  }, 1000);

  render() {
    const id = this.props.match.params.id;
    const recipe = _.find(this.props.recipes, { _id: id }) || {};

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
          id={id}
          title={recipe.title}
          ingredients={recipe.ingredients}
          recipe={recipe.recipe}
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
