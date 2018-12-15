import _ from 'lodash';

const planService = {
  generateRandomList: recipes => {
    return _.sampleSize(recipes, recipes.length);
  },
  generateLists: (recipes, length) => {
    if (!recipes.length) {
      return null;
    }
    // recipes = recipes.map(el => _.pick(el, ['type', 'title']));

    const generatedLists = _.mapValues(_.groupBy(recipes, 'type'), list => {
      if (!list.length) {
        return list;
      }
      const randomList = planService.generateRandomList(list);

      return _.times(length, i => randomList[i % randomList.length]);
    });

    return generatedLists;
  },
};

export default planService;