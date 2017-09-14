import React, {Component} from 'react';

import PostBody from "./PostBody";

export default class Post extends Component {

    render() {
        const post = this.props.post;
        return (
            <div className="post-container">
                <PostBody title={post.title}
                          timestamp={post.timestamp}/>
            </div>
        );
    }
}