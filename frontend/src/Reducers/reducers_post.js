import * as ActionConstants from "../Constants/ActionConstants";

export default function(state = {}, action) {
    switch(action.type) {
        case ActionConstants.LOAD_POST_AND_COMMENTS:
            var post = action.data.post;
            post['comments'] = action.data.comments;
            return post;
        default:
            return state;
    }
}