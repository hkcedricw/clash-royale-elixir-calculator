import React from 'react';
import PropTypes from 'prop-types';
import './ElixirDeductButton.css'

const ElixirDeductButton = props => {
  const handleClick = () => (event) => props.clickAction(props.number);
  return (
    <button className='deduct-Button' onClick={handleClick()}>{props.number}</button>
  )
}

ElixirDeductButton.propTypes = {
  number: PropTypes.number,
  clickAction: PropTypes.func
}

export default ElixirDeductButton;