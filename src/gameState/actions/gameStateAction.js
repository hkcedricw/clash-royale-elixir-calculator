import { PUMP_ADD_EXLIXIR_TIME } from '../constants'; 

export const GAME_START_ACTION = 'GAME_START_ACTION';
export const GAME_STOP_ACTION = 'GAME_STOP_ACTION';
export const DOUBLE_ELIXIR_ACTION = 'DOUBLE_ELIXIR_ACTION';
export const ADD_ELIXIR_ACTION = 'ADD_ELIXIR_ACTION';
export const DEDUCT_ELIXIR_ACTION = 'DEDUCT_ELIXIR_ACTION';
export const ADD_PUMP_ACTION = 'ADD_PUMP_ACTION';
export const DESTROY_PUMP_ACTION = 'DESTROY_PUMP_ACTION';

export const gameStartAction = (dispatch) => {
  dispatch({
    type: GAME_START_ACTION
  });
}

export const gameStopAction = (dispatch) => {
  dispatch({
    type: GAME_STOP_ACTION
  });
}

export const doubleElixirAction = (dispatch) => {
  dispatch({
    type: DOUBLE_ELIXIR_ACTION
  });
}

export const addElixirAction = (dispatch) => {
  dispatch({
    type: ADD_ELIXIR_ACTION
  });
}

export const deductElixirAction = (dispatch, number) => {
  dispatch({
    type: DEDUCT_ELIXIR_ACTION,
    payload: {
      deductNumber: number
    }
  });
}

export const addPumpAction = (dispatch) => {
  dispatch({
    type: ADD_PUMP_ACTION,
    payload: {
      pumpId: setInterval(
        () => {
          dispatch({
            type: ADD_ELIXIR_ACTION
          })
        },
        PUMP_ADD_EXLIXIR_TIME
      ) 
    }
  })
}

export const destroyPumpAction = (dispatch, pumpId) => {
  dispatch({
    type: DESTROY_PUMP_ACTION,
    payload: {
      pumpId
    }
  })
}

export const addElixirActionThunk = () => {
  return (dispatch) => {
    setTimeout(()=> {
        dispatch({
          type: ADD_ELIXIR_ACTION
        });
        dispatch(addElixirAction());
      },
      3000
    )
  };
}