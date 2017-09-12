import {combineReducers} from "redux";
import PostsReducer from "./reducers_posts";

export default combineReducers({
    posts: PostsReducer,
})