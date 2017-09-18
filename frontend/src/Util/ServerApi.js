const API_URL = "http://localhost:3001";
const headers = {Authorization: "mamigu", Accept: "application/json"};
const DELETE = "DELETE";
const POST = "POST";
const PUT = "PUT";

function request(data, method) {
    return {
        method,
        headers: {
            ...headers,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    }
}

function deleteRequest(data) {
    return request(data, DELETE);
}

function postRequest(data) {
    return request(data, POST);
}

function putRequest(data) {
    return request(data, PUT);
}

export function getAllCategories() {
    return fetch(`${API_URL}/categories`, {headers})
        .then((res) => res.json())
        .then(({categories}) => categories)
}

export function getPostsForCategory(category = '') {
    return fetch(`${API_URL}/${category}/posts`, {headers})
        .then((res) => res.json())
}

export function getAllPosts() {
    return fetch(`${API_URL}/posts`, {headers})
        .then((res) => res.json());
}

export function deletePost(postId) {
    return fetch(`${API_URL}/posts/${postId}`, deleteRequest(postId))
        .then((res) => res.json());
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

    return fetch(`${API_URL}/posts`, postRequest(postData))
        .then((res) => res.json());
}

export function voteOnPost(postId, postData) {
    return fetch(`${API_URL}/posts/${postId}`, postRequest(postData))
        .then((res) => res.json());
}

export function editPost(postId, postData) {
    return fetch(`${API_URL}/posts/${postId}`, putRequest(postData))
        .then((res) => res.json());
}

export function getPostDetails(postId) {
    return fetch(`${API_URL}/posts/${postId}`, {headers})
        .then((res) => res.json());
}

export function getCommentsForPost(postId) {
    return fetch(`${API_URL}/posts/${postId}/comments`, {headers})
        .then((res) => res.json());
}

export function createComment(postId, author, body) {
    const postData = {
        id: "_" + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().getTime(),
        parentId: postId,
        author,
        body,
    };

    return fetch(`${API_URL}/comments`, postRequest(postData))
        .then((res) => res.json());
}

export function voteOnComment(commentId, option) {
    const postData = {
        option
    };

    return fetch(`${API_URL}/comments/${commentId}`, postRequest(postData))
        .then(res => res.json());

}

export function deleteComment(commentId) {
    return fetch(`${API_URL}/comments/${commentId}`, deleteRequest(commentId))
        .then(res => res.json());
}

export function editComment(commentId, body) {
    const putData = {
        body,
        timestamp: new Date().getTime()
    };

    return fetch(`${API_URL}/comments/${commentId}`, putRequest(putData))
        .then(res => res.json());
}
