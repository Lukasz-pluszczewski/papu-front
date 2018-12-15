import { set } from 'perfect-immutable';
import request from '../services/request';
import planService from '../services/planService';

const actionsDefinitions = {
  getPlans: {
    type: 'better-promise',
    async: () => request.makeRequest('GET', '/plans'),
    initial: {
      'result.getPlans': [],
    },
  },
  getPlan: {
    type: 'better-promise',
    async: id => request.makeRequest('GET', `/plans/${id}`),
    initial: {
      'result.getPlan': null,
    },
  },
  savePlan: {
    type: 'better-promise',
    async: ({ plan, firstDay, numberOfDays, title, shoppingList }) => request.makeRequest('POST', '/plans', { plan, firstDay: firstDay.toISOString(), numberOfDays, title, shoppingList }),
  },
  getCurrentPlan: {
    type: 'better-promise',
    async: () => request.makeRequest('GET', `/plans/current`),
    initial: {
      'result.getCurrentPlan': null,
    },
  },
  saveCurrentPlan: {
    type: 'better-promise',
    async: ({ plan, firstDay, numberOfDays, title, shoppingList }) => request.makeRequest('POST', '/plans/current', { plan, firstDay: firstDay.toISOString(), numberOfDays, title, shoppingList }),
  },
  generatePlan: {
    type: 'better-promise',
    sync: ({ recipes, numberOfDays }) => ({
      generatedPlan: planService.generateLists(recipes, numberOfDays),
      numberOfDays,
    }),
    result: {
      generatedPlan: 'result.generatedPlan',
      generatedPlanDays: 'result.numberOfDays',
    },
  },
  setPlan: {
    type: 'default',
    result: {
      generatedPlan: { source: 'payload.plan', default: null },
      generatedPlanDays: { source: 'payload.planDays', default: null },
      shoppingList: { source: 'payload.shoppingList', default: null },
    },
  },
  setMultiplier: {
    type: 'default',
    result: {
      generatedPlan: (action, currentValue) => {
        const { listIndex, recipeIndex, value } = action.payload;
        if (Number.isInteger(listIndex) && Number.isInteger(recipeIndex) && Number.isInteger(value)) {
          return set(currentValue, `[${parseInt(listIndex)}][${parseInt(recipeIndex)}].multiplier`, value);
        }
        return currentValue;
      },
    },
  },
  setShoppingListIngredientStatus: {
    type: 'default',
    result: {
      shoppingList: (action, currentValue) => {
        if (!currentValue) {
          currentValue = {};
        }
        const { ingredient, value } = action.payload;

        return set(currentValue, `[${ingredient}]`, value);
      },
    },
  },
};

export default actionsDefinitions;
