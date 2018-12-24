import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Divider.scss';

const spacings = {
  normal: '1em',
  small: '.5em',
  large: '2em',
};

class Divider extends Component {
  static propTypes = {
    spacing: PropTypes.oneOf(['normal', 'small', 'large']),
    top: PropTypes.oneOf(['normal', 'small', 'large']),
    bottom: PropTypes.oneOf(['normal', 'small', 'large']),
    className: PropTypes.string,
    hideBorder: PropTypes.bool,
  };

  static defaultProps = {
    spacing: 'normal',
  };

  render() {
    const topSpacing = this.props.top || this.props.spacing;
    const bottomSpacing = this.props.bottom || this.props.spacing;

    return (
      <div
        className={classnames('Divider', this.props.className)}
        style={{
          marginTop: spacings[topSpacing],
          marginBottom: spacings[bottomSpacing],
          borderTop: this.props.hideBorder ? 'none' : null,
        }}
      />
    );
  }
}

export default Divider;