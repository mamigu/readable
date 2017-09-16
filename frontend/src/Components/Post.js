import React, {Component} from 'react';
import DeleteIcon from 'react-icons/lib/md/cancel';
import {Link} from "react-router-dom";

import * as Utilities from "../Util/Utilities";
import VoteScoreIcon from "./VoteScoreIcon";
import EditPostDialog from "./EditPostDialog";
import * as Strings from "../Constants/Strings";

export default class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display: false,
        }
    }

    openEditDialog() {
        this.setState({display: true});
    }

    onEditClose() {
        this.setState({display: false});
    }

    render() {
        const post = this.props.post;
        return (
            <div className="post-container">
                <VoteScoreIcon id={post.id}
                               voteScore={post.voteScore}/>
                <div className="post">
                    <div>
                        <Link to={`/${post.category}/${post.id}`}
                              className="post-link">
                            {Strings.Buttons.ViewPost}
                        </Link>
                        <button className="icon-btn post-link"
                                onClick={this.openEditDialog.bind(this)}>
                            {Strings.Buttons.EditPost}
                        </button>
                    </div>

                    <div className="post-details">
                        <span className="post-title">
                            {post.title}
                        </span>

                        <span className="post-timestamp">
                            {Utilities.convertSecondsToDate(post.timestamp)}
                        </span>
                        <button className="icon-btn"
                                style={{paddingTop: "5px", flex: "1 1 5%"}}
                                onClick={this.props.onDeletePost}>
                            <DeleteIcon size={30}/>
                        </button>
                    </div>
                    <div className="post-author">
                        {`Created by ${post.author}`}
                    </div>
                </div>
                <EditPostDialog display={this.state.display}
                                onClose={this.onEditClose.bind(this)}
                                currentPost={post}/>
            </div>
        )
    }
}