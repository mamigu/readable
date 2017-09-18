import React, {Component} from 'react';
import DeleteIcon from 'react-icons/lib/md/cancel';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import * as Utilities from "../Util/Utilities";
import * as Strings from "../Constants/Strings";

import VoteScoreIcon from "./VoteScoreIcon";
import EditPostDialog from "./Dialogs/EditPostDialog";
import CreateCommentDialog from "./Dialogs/CreateCommentDialog";
import {deletePost, voteOnPost} from "../Actions/index";

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayEditPost: false,
            displayCreateComment: false,
        }
    }

    openEditDialog() {
        this.setState({displayEditPost: true});
    }

    openCreateComment() {
        this.setState({displayCreateComment: true});
    }

    onEditClose() {
        this.setState({displayEditPost: false});
    }

    onCommentClose() {
        this.setState({displayCreateComment: false});
    }

    onVote(postId, option) {
        this.props.voteOnPost(postId, this.props.match.params.category, option);
    }

    render() {
        const post = this.props.post;
        return (
            <div className="post-container">
                <VoteScoreIcon id={post.id}
                               voteScore={post.voteScore}
                               onClick={this.onVote.bind(this)}/>
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
                        <span className="text-title">
                            {post.title}
                        </span>

                        <span className="text-timestamp">
                            {Utilities.convertSecondsToDate(post.timestamp)}
                        </span>
                        <button className="icon-btn"
                                style={{paddingTop: "5px", flex: "1 1 5%"}}
                                onClick={this.props.deletePost.bind(this, post.id)}>
                            <DeleteIcon size={25}/>
                        </button>
                    </div>
                    <div className="post-author">
                        {`Created by ${post.author}`}
                    </div>
                        {post.comments && post.comments.length > 0 ?
                            <Link to={`/${post.category}/${post.id}`}
                                  className="post-link">
                                Show all {post.comments.length} comment(s)...
                            </Link> :
                            <button className="icon-btn post-link"
                                    onClick={this.openCreateComment.bind(this)}>
                                {Strings.Buttons.CreateComment}
                            </button>
                        }
                </div>
                <EditPostDialog display={this.state.displayEditPost}
                                onClose={this.onEditClose.bind(this)}
                                post={post}/>
                <CreateCommentDialog display={this.state.displayCreateComment}
                                     onClose={this.onCommentClose.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ...state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        voteOnPost: (postId, category, option) => dispatch(voteOnPost(postId, category, option)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));