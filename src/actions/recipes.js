import request from '../services/request';
import recipeService from '../services/recipeService';

const actionsDefinitions = {
  getRecipes: {
    type: 'better-promise',
    async: query => request.makeRequest('GET', '/recipes', null, query),
    initial: {
      'result.getRecipes': [],
    },
  },
  deleteRecipe: {
    type: 'better-promise',
    async: id => request.makeRequest('DELETE', `/recipes/${id}`),
  },
  saveRecipe: {
    type: 'better-promise',
    async: recipe => recipeService.saveRecipe(recipe),
  },
  parseRecipe: {
    type: 'better-promise',
    async: recipe => recipeService
      .parseIngredients(recipe.ingredients)
      .then(ingredientsParsed => ({ ...recipe, ingredientsParsed })),
  },
};

export default actionsDefinitions;