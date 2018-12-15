import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import NativeSelect from '../NativeSelect/NativeSelect';
import { Input, InputNumber, Button, Select } from 'antd';

import './PlansToolbox.scss';

const Option = Select.Option;
const NativeOption = NativeSelect.Option;

class PlansToolbox extends Component {
  static propTypes = {
    plans: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    })),
    title: PropTypes.string,
    numberOfDays: PropTypes.number,
    savingPlan: PropTypes.bool,
    onNumberOfDaysChange: PropTypes.func,
    savePlan: PropTypes.func,
    onTitleChange: PropTypes.func,
    generateNewPlan: PropTypes.func,
    loadPlan: PropTypes.func,
    setFieldInPlan: PropTypes.func,
    generatedPlanNumberOfDays: PropTypes.number,
  };

  shouldComponentUpdate(props, state) {
    const isStateEqual = _.isEqual(this.state, state);
    const isPropsEqual = _.isEqual(this.props, props);
    return !(isStateEqual && isPropsEqual);
  };

  handlePlanChange = (value) => {
    this.props.loadPlan(value);
  };

  render() {
    return (
      <div className="PlansToolbox">
        <div className="PlansToolbox__row">
          <Select className="PlansToolbox__selectPlan" onChange={this.handlePlanChange} placeholder="Select plan">
            {this.props.plans.map(plan => (
              <Option key={plan._id} value={plan._id}>{plan.title}</Option>
            ))}
          </Select>
          <NativeSelect className="PlansToolbox__nativeSelectPlan" onChange={this.handlePlanChange} placeholder="Load plan">
            {this.props.plans.map(plan => (
              <NativeOption key={plan._id} value={plan._id}>{plan.title}</NativeOption>
            ))}
          </NativeSelect>
        </div>
        <div className="PlansToolbox__row">
          <div className="PlansToolbox__group">
            <NativeSelect
              value={this.props.numberOfDays}
              onChange={this.props.onNumberOfDaysChange}
              className="PlansToolbox__numberOfDaysSelect"
            >
              {_.times(14, i => <NativeOption key={i} value={i + 1}>{i + 1}</NativeOption>)}
            </NativeSelect>
            <InputNumber className="PlansToolbox__numberOfDaysInput" min={1} value={this.props.numberOfDays} onChange={this.props.onNumberOfDaysChange} />
            <Button className="PlansToolbox__generatePlanButton" type="primary" onClick={this.props.generateNewPlan}>{`Generate ${this.props.numberOfDays} days`}</Button>
          </div>
        </div>
        <div className="PlansToolbox__row">
          <Input className="PlansToolbox__planTitleInput" placeholder="Plan title" value={this.props.title} onChange={this.props.onTitleChange} />
          <Button
            className="PlansToolbox__savePlanButton"
            type="primary"
            disabled={!this.props.generatedPlanNumberOfDays}
            loading={this.props.savingPlan}
            onClick={this.props.savePlan}
          >
            {this.props.generatedPlanNumberOfDays
              ? `Save ${this.props.generatedPlanNumberOfDays} generated days as ${this.props.title ? _.truncate(this.props.title, { length: 10 }) : '[enter title]'}`
              : `Plan not generated`
            }
          </Button>
        </div>
      </div>
    );
  }
}

export default PlansToolbox;
