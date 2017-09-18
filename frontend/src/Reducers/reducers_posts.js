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
        case ActionConstants.LOAD_COMMENTS_FOR_POST:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                updatedPost.comments = action.data.comments;
                return {...state};
            }
            return state;
        case ActionConstants.VOTE_POST:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                updatedPost.voteScore = action.data.voteScore;
                return {...state};
            }

            return state;
        case ActionConstants.EDIT_POST:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.id ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                updatedPost.title = action.data.title;
                updatedPost.body = action.data.body;
                return {...state};
            }
            return state;
        case ActionConstants.DELETE_POST:
            var index = state[action.data.category].findIndex(post => post.id === action.data.id);
            return index > -1 && state[action.data.category].splice(index, 1).length === 1 ? {...state} : state;
        case ActionConstants.CREATE_COMMENT:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.comment.parentId ? ((updatedPost = post), true) : false);
            if(updatedPost !== null) {
                if(updatedPost.comments) {
                    updatedPost.comments.push(action.data.comment);
                }  else {
                    updatedPost.comments = [action.data.comment]
                }
                return {...state};
            }
            return state;
        case ActionConstants.VOTE_COMMENT:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.comment.parentId ? ((updatedPost = post), true) : false);

            if(updatedPost !== null) {
                let updatedComment = null;
                updatedPost.comments.some(comment => comment.id === action.data.comment.id ? ((updatedComment = comment), true) : false);
                updatedComment.voteScore = action.data.comment.voteScore;
                return {...state};
            }
            return state;
        case ActionConstants.EDIT_COMMENT:
            var updatedPost = null;
            state[action.data.category].some(post => post.id === action.data.comment.parentId ? ((updatedPost = post), true) : false);

            if(updatedPost !== null) {
                let updatedComment = null;
                updatedPost.comments.some(comment => comment.id === action.data.comment.id ? ((updatedComment = comment), true) : false);
                updatedComment.body = action.data.comment.body;
                return {...state};
            }
            return state;
        case ActionConstants.DELETE_COMMENT:
            var postIndex = state[action.data.category].findIndex(post => post.id === action.data.comment.parentId);
            var index = state[action.data.category][postIndex].comments.findIndex(comment => comment.id === action.data.comment.id);
            return index > -1 && state[action.data.category][postIndex].comments.splice(index, 1).length === 1 ? {...state} : state;
            return state;
        default:
            return state;
    }
}