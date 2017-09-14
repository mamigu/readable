import {combineReducers} from "redux";
import PostReducer from "./reducers_post";
import PostsReducer from "./reducers_home_view";
import CategoryReducers from "./reducers_category_view";
import CategoriesReducers from './reducers_categories';


export default combineReducers({
    categories: CategoriesReducers,
    category: CategoryReducers,
    posts: PostsReducer,
    post: PostReducer,
})