import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import { Icon } from'antd';

import './NativeSelect.scss';

export class Option extends Component {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value, selected, children, currentValue, ...props } = this.props;
    return (
      <option
        value={value}
        {...props}
      >
        {children}
      </option>
    );
  }
}

/**
 * ant-like native select
 */
class NativeSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node,
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className={classnames('NativeSelect', this.props.className)}>
        <select
          className="NativeSelect__select"
          value={this.props.value}
          onChange={this.handleChange}
        >
          {React.Children.map(this.props.children, child =>
            React.cloneElement(child, { currentValue: this.props.value })
          )}
        </select>
        {_.isNil(this.props.value) && this.props.placeholder
          ? <div className="NativeSelect__placeholder">{this.props.placeholder}</div>
          : null}
        <Icon className="NativeSelect__icon" type="down" />
      </div>
    );
  }
}


NativeSelect.Option = Option;

export default NativeSelect;