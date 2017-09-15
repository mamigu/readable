import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";
import * as Constants from "../Constants/Constants";

export default function(state = [], action) {
    switch(action.type) {
        case ActionConstants.GET_ALL_POSTS:
            return action.data.sort(Utilities.comparePostsWithProp(Constants.VoteScore));
        case ActionConstants.CREATE_NEW_POST:
            var currentPosts = state;
            !currentPosts.some(p => p.id === action.data.id) && currentPosts.push(action.data);

            return currentPosts.sort(Utilities.comparePostsWithProp(Constants.VoteScore));
        case ActionConstants.SORT_POSTS:
            var currentPosts = state;
            return currentPosts.sort(Utilities.comparePostsWithProp(action.data));
        default:
            return state;
    }
}