const url = "http://localhost:3001"
const headers = {Authorization: "mamigu", Accept: "application/json"};

export function getAllCategories() {
    return fetch(`${url}/categories`, {headers})
        .then((res) => res.json())
        .then(({categories}) => categories)
}

export function getPostsForCategory(category = '') {
    return fetch(`${url}/${category}/posts`, {headers})
        .then((res) => res.json())
        .then(({}))
}

export function getAllPosts() {
    return fetch(`${url}/posts`, {headers})
        .then((res) => res.json())
        .then()
}

export function createNewPost(postData) {
    return fetch(`${url}/posts`, postRequest(postData))
        .then((res) => res.json())
}

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