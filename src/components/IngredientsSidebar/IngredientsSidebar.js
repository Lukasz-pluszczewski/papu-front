import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Layout, Popconfirm, Input, Button, Icon, Collapse, List, Tooltip } from 'antd';

import './IngredientsSidebar.scss';

const { Panel } = Collapse;
const { Content, Sider } = Layout;
const { TextArea } = Input;

class RecipesSidebar extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  };

  render() {
    return (
      <List
        className="IngredientsSidebar"
        header={<div><h4>Ingredients</h4></div>}
        dataSource={this.props.ingredients}
        renderItem={
          item => (
            <List.Item>
              <Tooltip placement="right" title={<pre>{`Some text goes here`}</pre>}>
                <Popconfirm placement="topLeft" title="Are you sure you want to delete this recipe?" onConfirm={null} okText="Delete" cancelText="Cancel">
                  <Icon className="IngredientsSidebar__remove-recipe-icon" type="close" />
                </Popconfirm>
                <Link to={`/ingredients/${item._id}`}>{item.title}</Link>
              </Tooltip>
            </List.Item>
          )
        }
        loading={this.props.loading}
      />
    );
  }
}

export default RecipesSidebar;
