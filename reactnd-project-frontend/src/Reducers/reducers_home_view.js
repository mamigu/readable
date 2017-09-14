import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";

export default function(state = [], action) {
    switch(action.type) {
        case ActionConstants.GET_ALL_POSTS:
            return action.data.sort(Utilities.compareVoteScore);
        case ActionConstants.CREATE_NEW_POST:
            var currentPosts = state;
            !currentPosts.some(p => p.id === action.data.id) && currentPosts.push(action.data);

            return currentPosts.sort(Utilities.compareVoteScore);
        case ActionConstants.VOTE_POST:
            return state;
        default:
            return state;
    }
}