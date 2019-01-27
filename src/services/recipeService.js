import _ from 'lodash';
import request from './request';
import ingredientService from './ingredientService';

export const quantityPattern = /([\d,.]+)[ ]{0,1}(szt|sztuk|sztuki|g|gram|kg|łyżka|łyżek|łyżki|szklanka|szklanek|szklanki|litr|litry|litrów|litrow|l|ml|mililitrów|mililitry|liści|liść|liścia|kromka|kromek|kromki|gałązka|gałązki|gałązek).?/g; // eslint-disable-line max-len

export const replace = (string, patterns, replacement = '') => {
  let result = string;
  patterns.forEach(pattern => {
    result = result.replace(pattern, replacement);
  });
  return result;
};

const recipeService = {
  findQuantities: string => {
    const results = {
      matched: [],
      quantities: [],
    };
    let matched;
    while (matched = quantityPattern.exec(string)) { // eslint-disable-line no-cond-assign
      results.matched.push(matched[0]);
      results.quantities.push({
        quantity: matched[1],
        unit: matched[2],
      });
    }
    return results;
  },
  parseIngredientsLine: line => {
    const { quantities, matched } = recipeService.findQuantities(line);
    if (quantities.length) {
      return {
        ingredient: _.trim(replace(line, matched, '')),
        quantities,
      };
    }
  },
  normalizeIngredients: ingredients => {
    const ingredientsNames = ingredients.map(el => el.ingredient);
    return ingredientService
      .normalizeForms(ingredientsNames)
      .then(normalizedIngredients => ingredients.map(el => ({
        ...el,
        ingredient: normalizedIngredients[el.ingredient] || el.ingredient,
      })));
  },
  parseIngredients: recipe => {
    const parsedIngredients = _.filter(_.trim(recipe).split('\n').map(recipeService.parseIngredientsLine), el => el);
    return recipeService.normalizeIngredients(parsedIngredients);
  },
  saveRecipe: rawRecipe => recipeService
    .parseIngredients(rawRecipe.ingredients)
    .then(ingredientsParsed => {
      const { id, ...recipe } = rawRecipe;
      console.log('saving', rawRecipe);
      if (id) {
        return request.makeRequest('put', `/recipes/${id}`, { ...recipe, ingredientsParsed });
      }
      return request.makeRequest('post', '/recipes', { ...recipe, ingredientsParsed });
    }),
};

export default recipeService;