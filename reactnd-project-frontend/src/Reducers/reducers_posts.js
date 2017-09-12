import * as ActionConstants from "../Actions/ActionConstants";

export default function(state = {}, action) {
    switch(action.type) {
        case ActionConstants.GET_ALL_CATEGORIES:
            const categories = action.data;
            var posts = {};
            categories.forEach(cat => {
                posts[cat.path] = [];
            });

            return !state.hasOwnProperty("posts") ? {...state, posts: posts} : {...state};
        case ActionConstants.GET_ALL_POSTS:
            var posts = action.data;
            return {
                ...state
            };
        default:
            return state;
    }
}