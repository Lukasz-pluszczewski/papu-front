import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stringify from 'javascript-stringify';
import { BREAKFAST, DINNER, SNACK, SUPPER } from '../../constants/recipeTypes';

import { Link } from 'react-router-dom';
import { Button, Form, Input, Select, Card, Icon, Collapse, Spin } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;
const { Panel } = Collapse;

class RecipeForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    ingredients: PropTypes.string,
    recipe: PropTypes.string,
    parsedRecipe: PropTypes.object,
    type: PropTypes.number,
    loading: PropTypes.bool,
    parsing: PropTypes.bool,
    save: PropTypes.func,
    parseRecipe: PropTypes.func,
    getNormalizedForms: PropTypes.func,
  };

  state = {
    title: '',
    ingredients: '',
    recipe: '',
    type: DINNER,
  };

  changeRecipe = e => {
    this.setState({ recipe: e.target.value }, this.parseRecipe);
  };

  changeIngredients = e => {
    this.setState({ ingredients: e.target.value }, this.parseRecipe);
  };

  changeTitle = e => {
    this.setState({ title: e.target.value }, this.parseRecipe);
  };

  changeType = value => {
    this.setState({ type: value }, this.parseRecipe);
  };

  parseRecipe = () => {
    this.props.parseRecipe({
      title: this.state.title,
      recipe: this.state.recipe,
      ingredients: this.state.ingredients,
      type: this.state.type,
    });
  };

  clear = () => {
    this.setState({
      title: '',
      ingredients: '',
      recipe: '',
      type: DINNER,
    });
  };

  save = () => {
    this.props.save(
      {
        title: this.state.title,
        recipe: this.state.recipe,
        ingredients: this.state.ingredients,
        type: this.state.type,
        id: this.props.id,
      },
      this.clear
    );
  };

  render() {
    const collapse = (
      <Collapse defaultActiveKey={null}>
        <Panel header="Show parsed" key="1">
          <pre>
            {stringify(this.props.parsedRecipe, null, 2)}
          </pre>
        </Panel>
      </Collapse>
    );

    return (
      <Card
        actions={
          [
            this.props.loading
              ? <Icon type="loading" />
              : <Button key="save" type="primary" icon="save" onClick={this.save}>Save</Button>,
            this.props.id
              ? <Link to="/"><Button key="clear" type="normal" icon="arrow-left">New</Button></Link>
              : <Button key="clear" type="normal" icon="close" onClick={this.clear}>Clear</Button>,
          ]
        }
      >
        <Form>
          <FormItem label="Title">
            <Input value={this.state.title} onChange={this.changeTitle} />
          </FormItem>
          <FormItem label="Type">
            <Select onChange={this.changeType} value={this.state.type}>
              <Option value={BREAKFAST}>Breakfest</Option>
              <Option value={DINNER}>Dinner</Option>
              <Option value={SUPPER}>Supper</Option>
              <Option value={SNACK}>Snack</Option>
            </Select>
          </FormItem>
          <FormItem label="Ingredients">
            <TextArea value={this.state.ingredients} onChange={this.changeIngredients} autosize/>
          </FormItem>
          <FormItem label="Recipe">
            <TextArea value={this.state.recipe} onChange={this.changeRecipe} autosize/>
          </FormItem>
          {this.props.parsing ? (<Spin tip="Loading...">{collapse}</Spin>) : (collapse)}
        </Form>

      </Card>
    );
  }
}

export default RecipeForm;