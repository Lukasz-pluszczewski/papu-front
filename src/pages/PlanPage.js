import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import notification from '../services/notificationService';
import quantitiesService from '../services/quantitiesService';
import { getAction, connect } from '../services/reduxBreeze';

import PlansToolbox from '../components/PlansToolbox/PlansToolbox';
import RecipesTable from '../components/RecipesTable/RecipesTable';
import ShoppingList from '../components/ShoppingList/ShoppingList';
import Layout from '../components/Layout/Layout';

class PlanPage extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    plans: PropTypes.arrayOf(PropTypes.object),
    generatedPlan: PropTypes.object,
    shoppingList: PropTypes.objectOf(PropTypes.bool),
    recipesLoading: PropTypes.bool,
    plansSaving: PropTypes.bool,
    generatedPlanDays: PropTypes.number,
    getRecipes: PropTypes.func,
    getPlans: PropTypes.func,
    getPlan: PropTypes.func,
    getCurrentPlan: PropTypes.func,
    savePlan: PropTypes.func,
    saveCurrentPlan: PropTypes.func,
    generatePlan: PropTypes.func,
    setPlan: PropTypes.func,
    setMultiplier: PropTypes.func,
    setShoppingListIngredientStatus: PropTypes.func,
  };

  state = {
    numberOfDays: 7,
    firstDay: moment().add(1, 'day'),
    title: '',
    generatedPlan: null,
    generatedPlanNumberOfDays: 0,
  };

  componentDidMount() {
    if (!this.props.recipes.length) {
      this.loadRecipes();
    }
    if (!this.props.plans.length) {
      this.loadPlans();
    }
    this.loadCurrentPlan();
  }

  loadRecipes = () => {
    this.props.getRecipes();
  };

  loadPlans = () => {
    this.props.getPlans();
  };

  loadPlan = id => {
    this.props.getPlan(id, {
      success: ({ result }) => {
        this.props.setPlan({
          plan: result.plan,
          planDays: result.numberOfDays,
          firstDay: result.firstDay,
          shoppingList: result.shoppingList,
        });
        this.setState({
          title: result.title,
          firstDay: moment(result.firstDay),
        });
      },
      error: () => {
        notification.error('Loading plan error!', 'Could not load plan. Try again.');
      },
    });
  };

  loadCurrentPlan = () => {
    this.props.getCurrentPlan(null, {
      success: ({ result }) => {
        this.props.setPlan({
          plan: result.plan,
          planDays: result.numberOfDays,
          firstDay: result.firstDay,
          shoppingList: result.shoppingList,
        });
        this.setState({
          title: result.title,
          firstDay: moment(result.firstDay),
        });
      },
      error: () => {
        notification.error('Loading plan error!', 'Could not load plan. Try again.');
      },
    });
  }

  save = () => {
    const plan = this.props.generatedPlan;
    if (!plan) {
      return notification.error('Saving plan failed', 'Generate plan first');
    }
    const planData = {
      title: this.state.title,
      plan,
      firstDay: this.state.firstDay,
      numberOfDays: this.state.numberOfDays,
      shoppingList: this.props.shoppingList,
    };

    this.props.savePlan(planData, {
      success: () => {
        this.loadPlans();
        notification.success('Successfully saved', `"${planData.title}" plan has been saved`);
      },
      error: () => {
        notification.error('Saving failed!', 'Your plan has not been saved. Try again.');
      },
    });
  };

  saveCurrent = () => {
    const plan = this.props.generatedPlan;
    if (!plan) {
      return;
    }
    const planData = {
      title: this.state.title,
      plan,
      firstDay: this.state.firstDay,
      numberOfDays: this.state.numberOfDays,
      shoppingList: this.props.shoppingList,
    };

    this.props.saveCurrentPlan(planData, {
      error: () => {
        notification.error('Saving failed!', 'Your plan has not been saved!');
      },
    });
  };

  generatePlan = () => {
    this.props.generatePlan(
      { recipes: this.props.recipes, numberOfDays: this.state.numberOfDays },
      {
        success: () => this.saveCurrent(),
      },
    );
  };

  handleNumberOfDaysChange = numberOfDays => this.setState({ numberOfDays });

  handleFirstDayChange = firstDay => this.setState({ firstDay }, () => this.saveCurrent());

  handleTitleChange = e => this.setState({ title: e.target.value });

  handleIngredientChange = ({ value, ingredient }) => {
    this.props.setShoppingListIngredientStatus({ value, ingredient });
    setTimeout(() => this.saveCurrent(), 0); // waiting for the component to get an updated shoppingList value
  };

  handleChangeMultiplier = data => {
    this.props.setMultiplier(data);
    setTimeout(() => this.saveCurrent(), 0); // waiting for the component to get an updated plan value
  };

  render() {
    const summed = _.mapValues(quantitiesService.getIngredientsFromTableData(this.props.generatedPlan), quantitiesService.findQuantitiesSums);

    return (
      <Layout
        breadcrumbs={['Home', 'Plan']}
      >
        <React.Fragment>
          <PlansToolbox
            savePlan={this.save}
            savingPlan={this.props.plansSaving}
            onNumberOfDaysChange={this.handleNumberOfDaysChange}
            numberOfDays={this.state.numberOfDays}
            plans={this.props.plans}
            title={this.state.title}
            onTitleChange={this.handleTitleChange}
            generateNewPlan={this.generatePlan}
            generatedPlanNumberOfDays={this.props.generatedPlanDays}
            loadPlan={this.loadPlan}
          />
          {this.props.generatedPlan
            ? (
              <RecipesTable
                data={this.props.generatedPlan}
                length={this.props.generatedPlanDays}
                firstDay={this.state.firstDay}
                onFirstDayChange={this.handleFirstDayChange}
                setMultiplier={this.handleChangeMultiplier}
              />
            )
            : null}
          {this.props.generatedPlan
            ? (
              <ShoppingList
                ingredientsSums={summed}
                shoppingListValues={this.props.shoppingList}
                onIngredientChange={this.handleIngredientChange}
              />
            )
            : null}
        </React.Fragment>
      </Layout>
    );
  }
}

export default connect(
  {
    recipesLoading: 'recipes.pending.getRecipes',
    plansLoading: 'plan.pending.getPlans',
    planLoading: 'plan.pending.getPlan',
    planSaving: 'plan.pending.savePlan',
    recipes: 'recipes.result.getRecipes',
    plans: 'plan.result.getPlans',
    plan: 'plan.result.getPlan',
    generatedPlan: 'plan.generatedPlan',
    generatedPlanDays: 'plan.generatedPlanDays',
    shoppingList: 'plan.shoppingList',
  },
  {
    getRecipes: getAction('getRecipes'),
    parseRecipe: getAction('parseRecipe'),
    getPlans: getAction('getPlans'),
    getPlan: getAction('getPlan'),
    getCurrentPlan: getAction('getCurrentPlan'),
    savePlan: getAction('savePlan'),
    saveCurrentPlan: getAction('saveCurrentPlan'),
    generatePlan: getAction('generatePlan'),
    setPlan: getAction('setPlan'),
    setMultiplier: getAction('setMultiplier'),
    setShoppingListIngredientStatus: getAction('setShoppingListIngredientStatus'),
  }
)(PlanPage);
