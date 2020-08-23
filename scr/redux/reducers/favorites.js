import * as ActionTypes from '../../constants/ActionTypes';

const initialState = [];

export const favorites = (
  state = initialState, 
  action
) => {
  switch(action.type) {

    case ActionTypes.ADD_FAVORITE:
      if(state.some(el => el === action.payload))
        return state;
      else
        return state.concat(action.payload);

    case ActionTypes.DELETE_FAVORITE:
      return state.filter((favorite) => favorite !== action.payload);

    default:
      return state;
  }
}