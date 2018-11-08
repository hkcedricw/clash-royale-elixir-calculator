import GameStateReducer from './gameStateReducer';
import { initialState } from './gameStateReducer';
import {
  GAME_START_ACTION,
  GAME_STOP_ACTION,
  ADD_ELIXIR_ACTION,
  DOUBLE_ELIXIR_ACTION,
  DEDUCT_ELIXIR_ACTION,
  ADD_PUMP_ACTION,
  DESTROY_PUMP_ACTION
} from '../actions/gameStateAction';
import {
  INITIAL_EXLIXIR,
  DOUBLE_ELIXIR_TIME,
  NORMAL_ELIXIR_ADD_TIME,
  DOUBLE_ELIXIR_ADD_TIM,
  PUMP_ELIXIR,
  PUMP_ADD_EXLIXIR_TIME,
  MAX_ELIXIR
} from '../constants';

describe('gameStateReducer', () => {
  describe('When there is GAME_START_ACTION', () => {
    it('set state.stareted to trure', () => {
      const result = GameStateReducer(initialState, { type: GAME_START_ACTION });
      expect(result.started).toEqual(true);
    })
  })

  describe('When there is GAME_STOP_ACTION', () => {
    it('set state back to initialState', () => {
      const randomState = { ...initialState, started: true };
      const result = GameStateReducer(randomState, { type: GAME_STOP_ACTION });
      expect(result).toEqual(initialState);
    })
  })

  describe('When there is ADD_ELIXIR_ACTION, elixirs less than Max', () => {
    it('state.exlixir + 1', () => {
      const result = GameStateReducer(initialState, { type: ADD_ELIXIR_ACTION });
      expect(result.elixirs).toEqual(initialState.elixirs + 1);
    })
  })

  describe('When there is ADD_ELIXIR_ACTION, elixirs equals Max', () => {
    it('state.elixir + 1', () => {
      const state  = { ...initialState, elixirs: MAX_ELIXIR };
      const result = GameStateReducer(state, { type: ADD_ELIXIR_ACTION });
      expect(result.elixirs).toEqual(state.elixirs);
    })
  })

  describe('When there is DOUBLE_ELIXIR_ACTION', () => {
    it('set state.doubleElixirStarted to true', () => {
      const result = GameStateReducer(initialState, { type: DOUBLE_ELIXIR_ACTION });
      expect(result.doubleElixirStarted).toEqual(true);
    })
  })

  describe('When there is DEDUCT_ELIXIR_ACTION', () => {
    it('deduct state.elixir', () => {
      const deductNumber = 3;
      const result = GameStateReducer(initialState, { type: DEDUCT_ELIXIR_ACTION, payload: { deductNumber } });
      expect(result.elixirs).toEqual(initialState.elixirs-deductNumber);
    })
  })

  describe('When there is ADD_PUMP_ACTION', () => {
    it('add a pumpId to state.pumpIds', () => {
      const pumpId = 1;
      const result = GameStateReducer(initialState, { type: ADD_PUMP_ACTION, payload: { pumpId } });
      expect(result.pumpIds).toEqual([pumpId]);
    })
  })

  describe('When there is DESTROY_PUMP_ACTION', () => {
    it('remove the pumpId from state.pumpIds', () => {
      const pumpId = 1;
      const state = {
        ...initialState,
        pumpIds: [pumpId]
      }
      const result = GameStateReducer(state, { type: DESTROY_PUMP_ACTION, payload: { pumpId } });
      expect(result.pumpIds).toEqual([]);
    })
  })
})