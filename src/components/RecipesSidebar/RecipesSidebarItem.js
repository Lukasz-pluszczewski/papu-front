import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Popconfirm, Icon, List } from 'antd';

class RecipesSidebar extends Component {
  static propTypes = {
    item: PropTypes.object,
    onDelete: PropTypes.func,
    onRecipeClick: PropTypes.func,
  };

  handleDelete = () => {
    this.props.onDelete(this.props.item);
  };

  handleItemClick = () => {
    this.props.onRecipeClick(this.props.item);
  };

  render() {
    return (
      <List.Item>
        <Popconfirm placement="topLeft" title="Are you sure you want to delete this recipe?" onConfirm={this.handleDelete} okText="Delete" cancelText="Cancel">
          <Icon className="RecipesSidebar__remove-recipe-icon" type="close" />
        </Popconfirm>
        <a onClick={this.handleItemClick}>{this.props.item.title}</a>
      </List.Item>
    );
  }
}

export default RecipesSidebar;
