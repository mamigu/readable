import * as ServerApi from "../Util/ServerApi";
import * as ActionConstants from "../Constants/ActionConstants";

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
        return ServerApi.getAllPosts()
            .then(posts => {
                dispatch({
                    type: ActionConstants.GET_ALL_POSTS,
                    data: posts
                })
            });
    }
}

export function sortPostsByProperty(prop) {
    return (dispatch) => {
        dispatch({
            type: ActionConstants.SORT_POSTS,
            data: prop
        })
    }
}

export function getPostsForCategory(category = '') {
    return (dispatch) => {
        return ServerApi.getPostsForCategory(category)
            .then(posts => {
                dispatch({
                    type: ActionConstants.GET_POSTS_FOR_CATEGORY,
                    data: posts
                })
            })
    }
}

export function createNewPost(title, author, body, category) {
    const postData = {
        id: "_" + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().getTime(),
        title,
        author,
        body,
        category
    };

    return (dispatch) => {
        return ServerApi.createNewPost(postData)
            .then((newPost) => {
                dispatch({
                    type: ActionConstants.CREATE_NEW_POST,
                    data: newPost
                })
            });
    }
}

export function voteOnPost(postId, option) {

    return (dispatch) => {
        return ServerApi.voteOnPost(postId, {option})
            .then((post) => {
                dispatch({
                    type: ActionConstants.VOTE_POST,
                    data: post
                })
            })
    }
}

export function editPost(postId, title, body) {
    const postData = {
        title,
        body
    };

    return (dispatch) => {
        return ServerApi.editPost(postId, postData)
            .then((post) => {
                dispatch({
                    type: ActionConstants.EDIT_POST,
                    data: post
                })
            })
    }
}

export function getPostAndComments(postId) {
    return (dispatch) => {
        return ServerApi.getPostDetails(postId)
            .then((post) => {
                return ServerApi.getCommentsForPost(postId)
                    .then((comments) => {
                        dispatch({
                            type: ActionConstants.LOAD_POST_AND_COMMENTS,
                            data: {
                                comments,
                                post
                            }
                        })
                    })
            })
        }
}


export function getCommentsForPost(postId) {
    return (dispatch) => {
        return ServerApi.getCommentsForPost(postId)
            .then((comments) => {
                dispatch({
                    type: ActionConstants.LOAD_COMMENTS_FOR_POST,
                    data: comments
                })
            })
    }
}