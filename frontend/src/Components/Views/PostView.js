import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getCommentsForPost, getPostDetails, voteOnPost} from "../../Actions/index";
import VoteScoreIcon from "../VoteScoreIcon";
import * as Strings from "../../Constants/Strings";
import * as Utilities from "../../Util/Utilities";
import EditPostDialog from "../Dialogs/EditPostDialog";
import CreateCommentDialog from "../Dialogs/CreateCommentDialog";
import Comment from "../Comment";
import * as Constants from "../../Constants/Constants";

class PostView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayEditPost: false,
            displayCreateComment: false,
        }
    }

    componentDidMount() {
        this.props.getPostDetails(this.props.match.params.id)
            .then(() => {
                this.props.getCommentsForPost(this.props.match.params.id, this.props.match.params.category);
            })
    }

    openEditDialog() {
        this.setState({displayEditPost: true});
    }

    onEditClose() {
        this.setState({displayEditPost: false});
    }

    openCreateComment() {
        this.setState({displayCreateComment: true});
    }

    onCommentClose() {
        this.setState({displayCreateComment: false});
    }

    onVote(postId, option) {
        this.props.voteOnPost(postId, option);
    }

    render() {
        const posts = this.props.posts[this.props.match.params.category];
        const post = posts && posts.filter(p => p.id === this.props.match.params.id)[0];
        return (
            <div>
                {post && (
                    <div className="post-container">
                        <VoteScoreIcon id={post.id}
                                       onClick={this.onVote.bind(this)}
                                       voteScore={post.voteScore}/>
                        <div className="post">
                            <div>
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
                            </div>
                            <div className="post-author">
                                {`Created by ${post.author}`}
                            </div>
                            <div className="post-body">
                                {post.body}
                            </div>
                            <button className="icon-btn post-link"
                                    onClick={this.openCreateComment.bind(this)}>
                                {Strings.Buttons.CreateComment}
                            </button>
                        </div>
                </div>)}
                <div>
                    {post && post.comments && post.comments.length > 0 && post.comments.sort(Utilities.comparePostsWithProp(Constants.VoteScore)).map(comment => (
                        <Comment comment={comment}
                                 key={comment.id} />
                    ))
                    }
                </div>
                {post && (
                    <div>
                        <EditPostDialog display={this.state.displayEditPost}
                                        onClose={this.onEditClose.bind(this)}
                                        post={post}/>
                        <CreateCommentDialog display={this.state.displayCreateComment}
                                             onClose={this.onCommentClose.bind(this)}/>
                    </div>

                )}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ...state
    };
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetails: (postId) => dispatch(getPostDetails(postId)),
        getCommentsForPost: (postId, category) => dispatch(getCommentsForPost(postId, category)),
        voteOnPost: (postId, option) => dispatch(voteOnPost(postId, option))
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView))