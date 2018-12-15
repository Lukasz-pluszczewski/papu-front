import request from '../services/request';
import ingredientsService from '../services/ingredientService';

const actionsDefinitions = {
  getIngredients: {
    type: 'better-promise',
    async: () => request.makeRequest('GET', '/ingredients'),
    initial: {
      'result.getIngredients': [],
    },
  },
  saveIngredient: {
    type: 'better-promise',
    async: recipe => request.makeRequest(
      'POST',
      '/ingredients',
      recipe
    ),
  },
  getForms: {
    type: 'better-promise',
    async: ingredients => ingredientsService.getForms(ingredients),
    initial: {
      'result.getForms': {},
    },
  },
  getNormalizedForms: {
    type: 'better-promise',
    async: ingredients => ingredientsService.normalizeForms(ingredients),
    initial: {
      'result.getNormalizedForms': {},
    },
  },
  // baz: {
  //   type: 'better-promise',
  //   sync: actionParam => actionParam * 2,
  // },
};

export default actionsDefinitions;