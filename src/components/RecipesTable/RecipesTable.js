import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment';

import NativeSelect from '../NativeSelect/NativeSelect';
import { DatePicker, InputNumber } from 'antd';

import './RecipesTable.scss';

const NativeOption = NativeSelect.Option;

const types = {
  0: 'Breakfast',
  3: 'Snack',
  1: 'Dinner',
  2: 'Supper',
};

const dayFormat = 'dddd D.MM';

class RecipesTable extends Component {
  static propTypes = {
    data: PropTypes.object,
    length: PropTypes.number,
    firstDay: PropTypes.instanceOf(moment),
    onFirstDayChange: PropTypes.func,
    setMultiplier: PropTypes.func,
  };

  shouldComponentUpdate(props) {
    const isPropsEqual = _.isEqual(this.props, props);
    return !isPropsEqual;
  };

  renderRow = (field, recipes, columnStyle) => {
    switch(field) {
      case 'ingredients':
        return (
          <tr className={classnames('RecipesTable__row', `RecipesTable__${field}Row`)}>
            {recipes.map((recipe, recipeIndex) => (<td key={`${recipeIndex}${field}`} className="RecipesTable__column" style={columnStyle}><pre>{recipe[field]}</pre></td>))}
          </tr>
        );
      default:
        return (
          <tr className={classnames('RecipesTable__row', `RecipesTable__${field}Row`)}>
            {recipes.map((recipe, recipeIndex) => (<td key={`${recipeIndex}${field}`} className="RecipesTable__column" style={columnStyle}>{recipe[field]}</td>))}
          </tr>
        );
    }
  };

  handleMultiplierChange = (typeIndex, recipeIndex) => (value) => {
    this.props.setMultiplier({ listIndex: parseInt(typeIndex), recipeIndex: parseInt(recipeIndex), value });
  };

  renderMultiplierRow = (recipes, typeIndex, columnStyle) => {
    return (
      <tr className={classnames('RecipesTable__row', `RecipesTable__multiplierRow`)}>
        {recipes.map((recipe, recipeIndex) => (
          <td key={`${recipeIndex}multiplier`} className="RecipesTable__column" style={columnStyle}>
            <NativeSelect
              className="RecipesTable__multiplierSelect"
              value={recipe.multiplier || 1}
              onChange={this.handleMultiplierChange(typeIndex, recipeIndex)}
            >
              {_.times(10, i => <NativeOption value={i + 1}>{i + 1}</NativeOption>)}
            </NativeSelect>
            <InputNumber
              className="RecipesTable__multiplierInput"
              value={recipe.multiplier || 1}
              onChange={this.handleMultiplierChange(typeIndex, recipeIndex)}
            />
          </td>
        ))}
      </tr>
    );
  };

  render() {
    const columnStyle = {
      width: `${100 / this.props.length}%`,
    };

    return (
      <div className="RecipesTable">
        <table className="RecipesTable__table">
          <tbody>
            <tr className="RecipesTable__row">
              <td className="RecipesTable__column" style={columnStyle}>
                <DatePicker format={dayFormat} value={this.props.firstDay} onChange={this.props.onFirstDayChange} />
              </td>
              {_.times(this.props.length - 1, i => <td key={i}>{moment(this.props.firstDay).add(i + 1, 'day').format(dayFormat)}</td>)}
            </tr>
            {_.map(types, (typeName, typeIndex) => {
              const recipes = this.props.data[typeIndex];
              if (recipes && recipes.length) {
                return (
                  <React.Fragment key={typeIndex}>
                    {this.renderRow('title', recipes, columnStyle)}
                    {this.renderRow('ingredients', recipes, columnStyle)}
                    {this.renderMultiplierRow(recipes, typeIndex, columnStyle)}
                    {this.renderRow('recipe', recipes, columnStyle)}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RecipesTable;