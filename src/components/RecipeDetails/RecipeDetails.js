import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Collapse } from 'antd';

import './RecipeDetails.scss';

const { Panel } = Collapse;

class RecipesSidebar extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  render() {
    return (
      <div className="RecipesSidebar">
        <div className="RecipesSidebar__section">
          <h3 className="RecipesSidebar__name">Ingredients</h3>
          <pre className="RecipesSidebar__content">
            {this.props.item.ingredients}
          </pre>
        </div>
        <div className="RecipesSidebar__section">
          <h3 className="RecipesSidebar__name">Recipe</h3>
          <pre className="RecipesSidebar__content">
            {this.props.item.recipe}
          </pre>
        </div>
        <Collapse defaultActiveKey={null}>
          <Panel header="Show object" key="1">
            <pre>{JSON.stringify(this.props.item, null, 2)}</pre>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default RecipesSidebar;
