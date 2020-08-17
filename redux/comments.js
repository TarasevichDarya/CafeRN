import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload, comments: []};
        case ActionTypes.ADD_COMMENT:
            return {
                ...state, 
                comments: [
                    ...state.comments, 
                    {
                        ...action.payload,
                        id: state.comments.length > 0 ? state.comments[state.comments.length -1].id + 1 : 0
                    }
                ]
            };

        default:
            return state;
    }
}
