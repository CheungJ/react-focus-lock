import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from 'focus-lock/constants';
import {inlineProp} from './util';
import {mediumEffect} from "./medium";

export default class MoveFocusInside extends Component {
  static defaultProps = {
    disabled: false,
    className: undefined,
  };

  componentDidMount() {
    this.moveFocus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled && !this.props.disabled) {
      this.moveFocus();
    }
  }

  setObserveNode = (ref) => {
    this.observed = ref;
    this.moveFocus();
  };

  moveFocus() {
    const observed = this.observed;
    mediumEffect.useMedium(car => {
      if (!this.props.disabled && observed) {
        if (!car.focusInside(observed)) {
          car.moveFocusInside(observed, null);
        }
      }
    });
  }

  render() {
    const {children, disabled, className} = this.props;
    return (
      <div
        {...inlineProp(constants.FOCUS_AUTO, !disabled)}
        ref={this.setObserveNode}
        className={className}
      >
        {children}
      </div>
    );
  }
}

MoveFocusInside.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
