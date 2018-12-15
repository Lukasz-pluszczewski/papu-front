import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import stringify from 'javascript-stringify';
import ingredientService from '../../services/ingredientService';

import { Link } from 'react-router-dom';
import { Button, Form, Input, Select, Card, Icon, Collapse } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;
const { Panel } = Collapse;

class IngredientForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    forms: PropTypes.string,
    calories: PropTypes.number,
    caloriesQuantity: PropTypes.string,
    loading: PropTypes.bool,
    save: PropTypes.func,
  };
  static defaultProps = {
    forms: '',
    calories: 0,
    caloriesQuantity: 'g',
  };
  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        forms: props.forms,
      };
    }

    return null;
  }

  state = {
    id: this.props.id,
    forms: this.props.forms,
    calories: this.props.calories,
    caloriesQuantity: this.props.caloriesQuantity,
  };

  changeForms = e => {
    this.setState({ forms: e.target.value });
  };

  clear = () => {
    this.setState({
      forms: '',
      calories: '',
      caloriesQuantity: 'g',
    });
  };

  save = () => {
    this.props.save(
      {
        id: this.props.id,
        forms: this.state.forms,
        ...ingredientService.parseIngredients(this.state.forms),
      },
      this.clear
    );
  };

  render() {
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
          <FormItem label="Forms">
            <TextArea value={this.state.forms} onChange={this.changeForms} autosize/>
          </FormItem>
        </Form>
        <Collapse defaultActiveKey={null}>
          <Panel header="Show parsed" key="1">
            <pre>
              {stringify(ingredientService.parseIngredients(this.state.forms), null, 2)}
            </pre>
          </Panel>
        </Collapse>
      </Card>
    );
  }
}

export default IngredientForm;