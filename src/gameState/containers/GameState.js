import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  gameStartAction,
  gameStopAction,
  doubleElixirAction,
  addElixirAction,
  deductElixirAction,
  addPumpAction,
  destroyPumpAction
} from '../actions/gameStateAction';
import {
  DOUBLE_ELIXIR_TIME,
  NORMAL_ELIXIR_ADD_TIME,
  DOUBLE_ELIXIR_ADD_TIME,
  PUMP_ELIXIR
} from '../constants';
import ElixirDeductButton from '../components/ElixirDeductButton/ElixirDeductButton';
import DestroyPumpButton from '../components/DestroyPumpButton/DestroyPumpButton';
import './GameState.css';

const mapStateToProps = state => ({
  ...state.gameState
});

const mapDispatchToProps = dispatch => ({
  gameStartAction: () => gameStartAction(dispatch),
  gameStopAction: () => gameStopAction(dispatch),
  doubleElixirAction: () => doubleElixirAction(dispatch),
  addElixirAction: () => addElixirAction(dispatch),
  deductElixirAction: (number) => deductElixirAction(dispatch, number),
  addPumpAction: () => addPumpAction(dispatch),
  destroyPumpAction: (pumpId) => destroyPumpAction(dispatch, pumpId)
});

export class GameState extends Component {
  startGame = (event) => {
    this.props.gameStartAction();
    if(!this.gameTimerId) {
      this.gameTimerId = setTimeout(
        this.props.doubleElixirAction,
        DOUBLE_ELIXIR_TIME
      );
    }
    if(!this.addElixirTimerId) {
      this.addElixir();
    }
  }

  stopGame = (event) => {
    this.props.gameStopAction();
    if(this.gameTimerId) {
      clearTimeout(this.gameTimerId);
      this.gameTimerId = false;
    }
    if(this.addElixirTimerId) {
      clearTimeout(this.addElixirTimerId);
      this.addElixirTimerId = false;
    }
  }

  addElixir = () => {
    const add = () => {
      this.props.addElixirAction();
      this.addElixir();
    }
    this.addElixirTimerId = !this.props.doubleElixirStarted 
    ? setTimeout(
      add,
      NORMAL_ELIXIR_ADD_TIME
    )
    : setTimeout(
      add,
      DOUBLE_ELIXIR_ADD_TIME
    )
  }

  deductElixir = (number) => {
    if(this.props.elixirs >= number && this.props.started) {
      this.props.deductElixirAction(number);
    }
  }

  addPump = () => {
    if(this.props.elixirs >= PUMP_ELIXIR && this.props.started) {
      this.props.addPumpAction();
    }
  }

  destroyPump = (pumpId) => {
    clearInterval(pumpId);
    this.props.destroyPumpAction(pumpId);
  }

  render() {
    const elixirDeductButtons = [];
    for(var i=1; i<=9; i++){
      elixirDeductButtons.push((
        <div key={`elixirDeduct-${i}`}><ElixirDeductButton clickAction={this.deductElixir} number={i} /></div>
      ))
    }
    const pumps = [];
    this.props.pumpIds.forEach((pumpId) => {
      pumps.push((
        <div key={`destroyPump-${pumpId}`}><DestroyPumpButton clickAction={this.destroyPump} pumpId={pumpId} /></div>
      ));
    })
    return (
      <div className='container'>
        <div className='button-container'>
          <div>
            <button className='button' onClick={this.startGame}>Start</button>
          </div>
          <div>
            <button className='button' onClick={this.stopGame}>Stop</button>
          </div>
        </div>
        <div>
          Elixirs: {this.props.elixirs}
        </div>
        <div>
          Deduct Elixir:
        </div>
        <div className='button-container'>
          {elixirDeductButtons}
        </div>
        <div>
          Pumps:
        </div>
        <div className='button-container'>
          {pumps}
        </div>
        <div className='button-container'>
          <div>
            <button className='button' onClick={this.addPump}>Add Pump</button>
          </div>
        </div>
      </div>
    );
  }
}

GameState.propTypes = {
  started: PropTypes.bool,
  elixirs: PropTypes.number,
  doubleElixirStarted: PropTypes.bool,
  pumps: PropTypes.array,
  gameStartAction: PropTypes.func,
  gameStopAction: PropTypes.func,
  doubleElixirAction: PropTypes.func,
  addElixirAction: PropTypes.func,
  deductElixirAction: PropTypes.func,
  addPumpAction: PropTypes.func,
  destroyPumpAction: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(GameState);