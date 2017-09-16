import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";

export default function(state = [], action) {
    switch(action.type) {
        case ActionConstants.GET_POSTS_FOR_CATEGORY:
            return action.data.slice().sort(Utilities.comparePostsWithProp);
        case ActionConstants.CREATE_NEW_POST:
            var posts = state;

            !posts.some(p => p.id === action.data.id) && posts.push(action.data);
            return posts.slice().sort(Utilities.comparePostsWithProp);
        default:
            return state;
    }
}