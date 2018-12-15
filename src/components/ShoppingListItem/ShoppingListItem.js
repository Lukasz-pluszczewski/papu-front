import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Checkbox } from 'antd';

import './ShoppingListItem.scss';

class ShoppingListItem extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.node,
    ingredient: PropTypes.string,
    savedValue: PropTypes.bool,
  };

  handleSwitchChange = e => {
    this.props.onChange({ value: e.target.checked, ingredient: this.props.ingredient });
  };

  handleItemClick = () => {
    this.props.onChange({ value: !this.props.savedValue, ingredient: this.props.ingredient });
  };

  render() {
    return (
      <List.Item className="ShoppingListItem" key={this.props.ingredient} onClick={this.handleItemClick}>
        <Checkbox className="ShoppingListItem__switch" checked={this.props.savedValue} onChange={this.handleSwitchChange}/>
        <span className="ShoppingListItem__content">{this.props.children}</span>
      </List.Item>
    );
  }
}

export default ShoppingListItem;