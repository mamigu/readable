import * as ActionConstants from "../Constants/ActionConstants";
import * as Utilities from "../Util/Utilities";

export default function(state = {}, action) {
    switch (action.type) {
        case ActionConstants.GET_ALL_POSTS:
            var posts = {};
            action.data.forEach(post => {
                if(posts.hasOwnProperty(post.category)) {
                    posts[post.category].push(post);
                } else {
                    posts[post.category] = [post];
                }
            });
            return posts;

        case ActionConstants.GET_POSTS_FOR_CATEGORY:
            return {
                ...state,
                [action.data.category]: action.data.posts.slice().sort(Utilities.comparePostsWithProp)
            };
        case ActionConstants.CREATE_NEW_POST:
            var posts = state[action.data.category];
            return posts && !posts.some(p => p.id === action.data.id) && posts.push(action.data) ?
                {
                ...state,
                [action.data.category]: posts.slice()
                } : {...state, [action.data.category]: [action.data]};
        case ActionConstants.LOAD_POST:
            return state.hasOwnProperty(action.data.category) ? { ...state} : {
                ...state,
                [action.data.category]: [action.data]
            };
        case ActionConstants.VOTE_POST:
            var posts = state[action.data.category].slice();
            var updatedPost = null;
            posts.some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            updatedPost && (updatedPost.voteScore = action.data.voteScore);
            return {
                ...state,
                [action.data.category]: posts
            };
        case ActionConstants.EDIT_POST:
            var posts = state[action.data.category].slice();
            var updatedPost = null;
            posts.some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                updatedPost.title = action.data.title;
                updatedPost.body = action.data.body;
                return {
                    ...state,
                    [action.data.category]: posts
                };
            }
            return state;
        case ActionConstants.DELETE_POST:
            var index = state[action.data.category].findIndex(post => post.id === action.data.id);
            return index > -1 && state[action.data.category].splice(index, 1).length === 1 ? {...state} : state;;
        default:
            return state;
    }
}