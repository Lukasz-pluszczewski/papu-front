import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAction, connect } from '../services/reduxBreeze';

import Layout from '../components/Layout/Layout';
import IngredientsSidebar from '../components/IngredientsSidebar/IngredientsSidebar';
import IngredientForm from '../components/IngredientForm/IngredientForm';
import { Breadcrumb, Input } from 'antd';

const { Content, Sider } = Layout;
const { TextArea } = Input;

class HistoryPage extends Component {
  componentDidMount() {
    this.load();
  }

  save = (ingredient, success) => {
    this.props.saveIngredient(
      ingredient,
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
    this.props.getIngredients();
  };

  render() {
    return (
      <Layout
        sider={<IngredientsSidebar recipes={this.props.ingredients} loading={this.props.ingredientsLoading} />}
        breadcrumbs={['Home', 'Ingredients']}
      >
        <IngredientForm loading={this.props.ingredientSaving} save={this.save} />
      </Layout>
    );
  }
}

export default connect(
  {
    ingredientsLoading: 'state.recipes.pending.getIngredients',
    formsLoading: 'state.recipes.pending.getForms',
    ingredientSaving: 'state.recipes.pending.saveIngredient',
    ingredients: 'state.recipes.result.getIngredients',
    forms: 'state.recipes.result.getForms',
  },
  {
    getIngredients: getAction('getIngredients'),
    getForms: getAction('getForms'),
    saveIngredient: getAction('saveIngredient'),
  }
)(HistoryPage);
