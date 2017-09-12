import * as ServerApi from "../Util/ServerApi";
import * as ActionConstants from "./ActionConstants";

export function getAllCategories() {
    return (dispatch) => {
        ServerApi.getAllCategories()
            .then(categories => {
                dispatch({
                    type: ActionConstants.GET_ALL_CATEGORIES,
                    data: categories
                })
            })
    }
}

export function getAllPosts() {
    return (dispatch) => {
        ServerApi.getAllPosts()
            .then(posts => {
                dispatch({
                    type: ActionConstants.GET_ALL_POSTS,
                    data: posts
                })
            });
    }
}

export function getPostsForCategory(category = '') {
    return (dispatch) => {
        ServerApi.getPostsForCategory(category)
            .then(posts => {
                dispatch({
                    type: ActionConstants.GET_POSTS_FOR_CATEGORY,
                    data: posts
                })
            })
    }
}

export function createNewPost(title, body, owner, category) {
    const postData = {
        id: "_" + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().getTime(),
        title,
        body,
        owner,
        category
    };

    return (dispatch) => {
        ServerApi.createNewPost(postData)
            .then(() => {
                dispatch({
                    type: ActionConstants.CREATE_NEW_POST,
                })
            })
    }
}