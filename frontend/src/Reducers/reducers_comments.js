import * as ActionConstants from "../Constants/ActionConstants";

export default function(state={}, action) {
    switch(action.type) {
        case ActionConstants.LOAD_COMMENTS_FOR_POST:
            return {
                ...state,
                [action.data.id]: action.data.comments
            };
        case ActionConstants.CREATE_COMMENT:
            var currentComments = state[action.data.parentId];
            if(currentComments) {
                let comments = currentComments.slice();
                comments.push(action.data);
                return {
                    ...state,
                    [action.data.parentId]: comments
                }
            }

            return {
                ...state,
                [action.data.parentId]: [action.data]
            };
        case ActionConstants.VOTE_COMMENT:
            var comments = state[action.data.parentId].slice();
            var comment = null;
            comments.some(c => c.id === action.data.id ? ((comment = c), true) : false)
            comment && (comment.voteScore = action.data.voteScore);
            return {
                ...state,
                [action.data.parentId]: comments
            };
        case ActionConstants.EDIT_COMMENT:
            var comments = state[action.data.parentId].slice();
            var comment = null;
            comments.some(c => c.id === action.data.id ? ((comment = c), true) : false)
            comment && (comment.body = action.data.body);
            return {
                ...state,
                [action.data.parentId]: comments
            };
        case ActionConstants.DELETE_COMMENT:
            var commentIndex = state[action.data.parentId].findIndex(c => c.id === action.data.id);
            return commentIndex > -1 && state[action.data.parentId].splice(commentIndex, 1).length === 1 ? {...state} : state;
        default:
            return state;
    }
}