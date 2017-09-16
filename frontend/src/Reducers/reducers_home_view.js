import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";
import * as Constants from "../Constants/Constants";

export default function(state = [], action) {
    switch(action.type) {
        case ActionConstants.GET_ALL_POSTS:
            return action.data.sort(Utilities.comparePostsWithProp(Constants.VoteScore));
        case ActionConstants.SORT_POSTS:
            return state.slice().sort(Utilities.comparePostsWithProp(action.data));
        case ActionConstants.VOTE_POST:
            var updatedPost = null;
            state.some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            updatedPost !== null && (updatedPost.voteScore = action.data.voteScore);

            return state.slice();
        case ActionConstants.EDIT_POST:
            var updatedPost = null;
            state.some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                updatedPost.title = action.data.title;
                updatedPost.body = action.data.body;
                return state.slice();
            }
            return state;
        case ActionConstants.CREATE_NEW_POST:
            var currentPosts = state;
            !currentPosts.some(p => p.id === action.data.id) && currentPosts.push(action.data);

            return currentPosts.slice().sort(Utilities.comparePostsWithProp(Constants.VoteScore));
        case ActionConstants.DELETE_POST:
            var index = state.findIndex(post => post.id === action.data);
            return index > -1 && state.splice(index, 1).length === 1 ? state.slice() : state;
        default:
            return state;
    }
}