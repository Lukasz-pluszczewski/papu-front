import _ from 'lodash';
import request from './request';

export const caloriesPattern = /(\d+) ?(?:kcal\/?)? ?(\d+)(g|kg|ml|l)/g;

export const replace = (string, patterns, replacement = '') => {
  let result = string;
  patterns.forEach(pattern => {
    result = result.replace(pattern, replacement);
  });
  return result;
};

const ingredientService = {
  parseLine: ingredient => {
    const [match, kcal, amount, quantity] = caloriesPattern.exec(ingredient) || [];
    const [name, ...forms] = ingredient.replace(match || '', '').split(/, ?/);

    return {
      name,
      forms,
      kcal,
      amount,
      quantity,
    };
  },
  parseIngredients: ingredients => _.trim(ingredients).split('\n').map(ingredientService.parseLine),
  loadForms: ingredients => {
    return Promise.all(ingredients.map(ingredient => request.makeRequest('get', `/forms/${encodeURI(ingredient)}`).then(response => {
      return _.reduce(response, (accu, forms) => {
        accu.forms = [...accu.forms, ...forms];
        return accu;
      }, { base: response.base, forms: [] });
    })));
  },
  getForms: async ingredients => {
    const resultsList = await ingredientService.loadForms(ingredients);
    const results = {};
    resultsList.forEach(result => {
      results[result.base] = result;
    });

    return results;
  },
  normalizeForms: async ingredients => {
    const resultsList = await ingredientService.loadForms(ingredients);
    const results = {};
    ingredients.forEach((ingredient, i) => {
      results[ingredient] = resultsList[i].base;
    });

    return results;
  },
};

export default ingredientService;