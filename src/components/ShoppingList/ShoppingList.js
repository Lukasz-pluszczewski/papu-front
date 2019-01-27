import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ShoppingListItem from '../ShoppingListItem/ShoppingListItem';
import { List } from 'antd';

import './ShoppingList.scss';

class ShoppingList extends Component {
  static propTypes = {
    ingredientsSums: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
    shoppingListValues: PropTypes.objectOf(PropTypes.bool),
    onIngredientChange: PropTypes.func,
  };

  shouldComponentUpdate(props, state) {
    const isStateEqual = _.isEqual(this.state, state);
    const isPropsEqual = _.isEqual(this.props, props);
    return !(isStateEqual && isPropsEqual);
  }

  handleSwitchChange = value => {
    this.props.onIngredientChange(value);
  };

  renderItem = item => (
    <ShoppingListItem
      onChange={this.handleSwitchChange}
      ingredient={item.ingredientName}
      savedValue={this.props.shoppingListValues && this.props.shoppingListValues[item.ingredientName]}
    >
      {item.content}
    </ShoppingListItem>
  );

  render() {
    const listData = _.chain(this.props.ingredientsSums)
      .map((ingredients, ingredientName) => {
        ingredientName = ingredientName.toLowerCase();
        return {
          content: `${ingredientName}: ${_.map(ingredients, (value, unit) => `${value}${unit}`).join(' + ')}`,
          ingredientName,
        };
      })
      .sortBy(el => _.deburr(el.ingredientName));

    return (
      <div className="ShoppingList">
        <h3 className="ShoppingList__header">
          Shopping list
        </h3>
        <List
          bordered
          dataSource={listData}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}

export default ShoppingList;