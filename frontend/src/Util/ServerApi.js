const API_URL = "http://localhost:3001";
const headers = {Authorization: "mamigu", Accept: "application/json"};

function postRequest(data) {
    return {
        method: "POST",
        headers: {
            ...headers,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    }
}

function putRequest(data) {
    return {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
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

export function createNewPost(postData) {
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

