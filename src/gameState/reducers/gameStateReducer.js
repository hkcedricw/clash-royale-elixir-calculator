
import { 
  GAME_START_ACTION,
  GAME_STOP_ACTION,
  ADD_ELIXIR_ACTION,
  DOUBLE_ELIXIR_ACTION,
  DEDUCT_ELIXIR_ACTION,
  ADD_PUMP_ACTION,
  DESTROY_PUMP_ACTION
} from '../actions/gameStateAction';

import { INITIAL_ELIXIR, PUMP_ELIXIR, MAX_ELIXIR } from '../constants';

export const initialState = {
  started: false,
  elixirs: INITIAL_ELIXIR,
  doubleElixirStarted: false,
  pumpIds: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_START_ACTION:
      return {
        ...state,
        started: true
      }
    case GAME_STOP_ACTION:
      state.pumpIds.forEach(pumpId => clearInterval(pumpId));
      return initialState;
    case ADD_ELIXIR_ACTION:
      return {
        ...state,
        elixirs: state.elixirs >= MAX_ELIXIR ? state.elixirs : state.elixirs+1
      }
    case DOUBLE_ELIXIR_ACTION:
      return {
        ...state,
        doubleElixirStarted: true,
        elixirs: state.elixirs >= MAX_ELIXIR ? state.elixirs : state.elixirs+1
      }
    case DEDUCT_ELIXIR_ACTION:
      return {
        ...state,
        elixirs: state.elixirs - action.payload.deductNumber
      }
    case ADD_PUMP_ACTION:
      return {
        ...state,
        elixirs: state.elixirs - PUMP_ELIXIR,
        pumpIds: state.pumpIds.concat(action.payload.pumpId)
      }
    case DESTROY_PUMP_ACTION:
      return {
        ...state,
        pumpIds: state.pumpIds.filter(
          pumpId => pumpId !== action.payload.pumpId
        )
      }
    default:
      return state
  }
 }