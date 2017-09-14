import React, {Component} from 'react';

import PostBody from "./PostBody";
import VoteScoreIcon from "./VoteScoreIcon";

class FullPost extends Component {

    componentWillMount() {
        this.props.getCommentsForPost()
    }

    render() {
        const post = this.props.post;
        return (
            <div className="post-container">
                <VoteScoreIcon id={post.id}
                               voteScore={post.voteScore}/>
                <PostBody title={post.title}
                          timestamp={post.timestamp}/>
            </div>
        )
    }
}

