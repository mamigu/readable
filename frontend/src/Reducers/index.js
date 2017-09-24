import {combineReducers} from "redux";
import PostsReducer from "./reducers_posts";
import CategoriesReducers from './reducers_categories';
import CommentsReducer from './reducers_comments';

export default combineReducers({
    categories: CategoriesReducers,
    posts: PostsReducer,
    comments: CommentsReducer
})