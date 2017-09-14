import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";

export default function(state = [], action) {
    switch(action.type) {
        case ActionConstants.GET_POSTS_FOR_CATEGORY:
            var posts = action.data.posts.sort(Utilities.compareVoteScore);
            return posts;
        case ActionConstants.CREATE_NEW_POST:
            var posts = state;

            posts.some(p => p.category === action.data.category) && !posts.some(p => p.id === action.data.id) && posts.push(action.data);
            return posts.sort(Utilities.compareVoteScore);
        default:
            return state;
    }
}