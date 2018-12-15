import _ from 'lodash';

/**
 *
 * Ratio: derivative / base,
 * Example of ratio usage: [base] = [derivative] * [ratio]; kg = g * ratio
 * @type {{kg: {names: [string], derivatives: [null]}}}
 */
export const quantities = {
  kg: {
    names: ['kg', 'kilogramów', 'kilograma', 'kilogram'],
    derivatives: {
      g: {
        names: ['g', 'gramów', 'grama', 'gramy'],
        ratio: 1 / 1000,
      },
      mg: {
        names: ['mg', 'miligramów', 'miligrama', 'miligramy'],
        ratio: 1 / 1000000,
      },
    },
  },
  l: {
    names: ['l', 'litr', 'litrów', 'litra'],
    derivatives: {
      ml: {
        names: ['ml', 'mililitrów', 'mililitra', 'mililitry'],
        ratio: 1 / 1000,
      },
      szklanka: {
        names: ['szklanka', 'szklanek', 'szklanki'],
        ratio: 1 / 4,
      },
    },
  },
};

const quantitiesService = {
  findQuantity: quantityName => {
    const results = [];
    _.forEach(quantities, (quantityDetails, quantityBase) => {
      if (_.includes(quantityDetails.names, quantityName)) {
        results.push({
          ratio: 1,
          unit: quantityBase,
        });
      } else {
        _.forEach(quantityDetails.derivatives, derivativeDetails => {
          if (_.includes(derivativeDetails.names, quantityName)) {
            results.push({
              ratio: derivativeDetails.ratio,
              unit: quantityBase,
            });
          }
        });
      }
    });

    return results;
  },
  normalizeQuantity: ({ quantity, unit }) => {
    const quantityDetails = quantitiesService.findQuantity(unit);

    if (quantityDetails.length) {
      return {
        quantity: quantity * quantityDetails[0].ratio,
        unit: quantityDetails[0].unit,
      };
    }
    return {
      quantity,
      unit,
    };
  },
  normalizeQuantities: quantities => {
    return quantities.map(quantitiesService.normalizeQuantity);
  },
  getIngredientsFromTableData: tableData => {
    if (!tableData) {
      return {};
    }
    const ingredients = {};

    _.forEach(tableData, collection => {
      collection.forEach(recipe => {
        recipe.ingredientsParsed.forEach(ingredient => {
          if (!ingredients[ingredient.ingredient]) {
            ingredients[ingredient.ingredient] = [];
          }
          ingredients[ingredient.ingredient].push(quantitiesService.normalizeQuantities(ingredient.quantities.map(quantity => ({ ...quantity, quantity: `${parseFloat(quantity.quantity * (recipe.multiplier || 1))}` }))));
        });
      });
    });

    return ingredients;
  },
  findQuantitiesSums: quantities => {
    if (!quantities || !quantities.length) {
      return null;
    }

    // listing and sorting all units
    const units = [];
    quantities.forEach(item => {
      item.forEach(({ unit }) => {
        units.push(unit);
      });
    });

    const unitsSorted = _.chain(units)
      .countBy()
      .reduce((accu, count, unit) => {
        accu.push({ unit, count });
        return accu;
      }, [])
      .sortBy(['count', 'unit'])
      .reverse()
      .value();

    // creating sums for each unit
    const sums = {};
    const quantitiesLeft = _.clone(quantities);
    unitsSorted.forEach(({ unit }) => {
      const indexesToRemove = [];
      quantitiesLeft.forEach((item, index) => {
        const quantity = _.find(item, { unit });
        if (quantity) {
          indexesToRemove.push(index);

          if (!sums[unit]) {
            sums[unit] = 0;
          }
          sums[unit] += parseFloat(quantity.quantity);
        }
      });

      _.remove(quantitiesLeft, (value, key) => _.includes(indexesToRemove, key));

      if (sums[unit]) {
        sums[unit] = _.round(sums[unit], 2);
      }
    });

    return sums;
  },
};

export default quantitiesService;