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
                    data: {
                        posts,
                        category
                    }
                })
            })
    }
}

export function deletePost(postId) {
    return (dispatch) => {
        return ServerApi.deletePost(postId)
            .then((deletedPost) => {
                dispatch({
                    type: ActionConstants.DELETE_POST,
                    data: deletedPost
                })
            })
    }
}

export function createNewPost(title, author, body, category) {
    return (dispatch) => {
        return ServerApi.createNewPost(title, author, body, category)
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

export function getPostDetails(postId) {
    return (dispatch) => {
        return ServerApi.getPostDetails(postId)
            .then((post) => {
                dispatch({
                    type: ActionConstants.LOAD_POST,
                    data: post
                })
            })
    }
}

export function getCommentsForPost(postId, category) {
    return (dispatch) => {
        return ServerApi.getCommentsForPost(postId)
            .then((comments) => {
                dispatch({
                    type: ActionConstants.LOAD_COMMENTS_FOR_POST,
                    data: {
                        id: postId,
                        category,
                        comments,
                    }
                })
            })
    }
}

export function createComment(postId, author, body) {
    return (dispatch) => {
        return ServerApi.createComment(postId, author, body)
            .then((comment) => {
                dispatch({
                    type: ActionConstants.CREATE_COMMENT,
                    data: comment
                })
            })
    }
}

export function voteOnComment(commentId, option) {
    return (dispatch) => {
        return ServerApi.voteOnComment(commentId, option)
            .then(comment => {
                dispatch({
                    type: ActionConstants.VOTE_COMMENT,
                    data: comment
                })
            })
    }
}

export function deleteComment(commentId) {
    return (dispatch) => {
        return ServerApi.deleteComment(commentId)
            .then(comment => {
                dispatch({
                    type: ActionConstants.DELETE_COMMENT,
                    data: comment
                })
            })
    }
}

export function editComment(commentId, body) {
    return (dispatch) => {
        return ServerApi.editComment(commentId, body)
            .then(comment => {
                dispatch({
                    type: ActionConstants.EDIT_COMMENT,
                    data: comment,
                })
            })
    }
}