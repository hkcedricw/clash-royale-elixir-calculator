import React from 'react';
import PropTypes from 'prop-types';
import './DestroyPumpButton.css'

const DestroyPumpButton = props => {
  const handleClick = () => (event) => props.clickAction(props.pumpId);
  return (
    <button className='destroy-Button' onClick={handleClick()}>{`pump-${props.pumpId}`}</button>
  )
}

DestroyPumpButton.propTypes = {
  pumpId: PropTypes.number,
  clickAction: PropTypes.func
}

export default DestroyPumpButton;