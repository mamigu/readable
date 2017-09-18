import {combineReducers} from "redux";
import PostsReducer from "./reducers_posts";
import CategoriesReducers from './reducers_categories';

export default combineReducers({
    categories: CategoriesReducers,
    posts: PostsReducer,
})