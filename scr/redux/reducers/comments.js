import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
  errMess: null,
  comments: []
};

export const comments = (
  state = initialState, 
  action
) => {
  switch(action.type) {

    case ActionTypes.ADD_COMMENTS:
      return {
        ...state, 
        errMess: null, 
        comments: action.payload
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state, 
        errMess: action.payload, 
        comments: []
      };

    case ActionTypes.ADD_COMMENT:
      const currentComment = action.payload;
      return {
        ...state, 
        comments: state.comments.concat(currentComment) 
      };

    default:
      return state;
  }
}
