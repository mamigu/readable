const url = "http://localhost:3001";
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

export function getAllCategories() {
    return fetch(`${url}/categories`, {headers})
        .then((res) => res.json())
        .then(({categories}) => categories)
}

export function getPostsForCategory(category = '') {
    return fetch(`${url}/${category}/posts`, {headers})
        .then((res) => res.json())
}

export function getAllPosts() {
    return fetch(`${url}/posts`, {headers})
        .then((res) => res.json());
}

export function createNewPost(postData) {
    return fetch(`${url}/posts`, postRequest(postData))
        .then((res) => res.json());
}

export function voteOnPost(postId, postData) {
    return fetch(`${url}/posts/${postId}`, postRequest(postData));
}

export function getPostDetails(postId) {
    return fetch(`${url}/posts/${postId}`, {headers})
        .then((res) => res.json());
}

export function getCommentsForPost(postId) {
    return fetch(`${url}/posts/${postId}/comments`, {headers})
        .then((res) => res.json());
}

