import request from '../services/request';
import recipeService from '../services/recipeService';

const actionsDefinitions = {
  getRecipes: {
    type: 'better-promise',
    async: () => request.makeRequest('GET', '/recipes'),
    initial: {
      'result.getRecipes': [],
    },
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