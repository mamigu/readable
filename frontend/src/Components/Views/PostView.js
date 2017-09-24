import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import DeleteIcon from 'react-icons/lib/md/cancel';

import {deletePost, getCommentsForPost, getPostDetails, voteOnPost} from "../../Actions/index";
import VoteScoreIcon from "../VoteScoreIcon";
import * as Strings from "../../Constants/Strings";
import * as Utilities from "../../Util/Utilities";
import EditPostDialog from "../Dialogs/EditPostDialog";
import CreateCommentDialog from "../Dialogs/CreateCommentDialog";
import Comment from "../Comment";
import * as Constants from "../../Constants/Constants";
import {Loading} from "react-loading";

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
        const comments = post ? this.props.comments[post.id] : [];
        return (
            <div>
                {this.state.loading ? <Loading delay={200} type='spin' color='#222' className='loading'/> : (
                    <div>
                        {post ? <div>
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
                                        <span className="post-link">
                                            {comments ? comments.length : 0} comment(s)...
                                        </span>
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
                                    <div className="post-body">
                                        {post.body}
                                    </div>
                                    <button className="icon-btn post-link"
                                            onClick={this.openCreateComment.bind(this)}>
                                        {Strings.Buttons.CreateComment}
                                    </button>
                                </div>
                            </div>
                            {comments && comments.length > 0 && (
                                <div>
                                    {comments.sort(Utilities.comparePostsWithProp(Constants.VoteScore)).map(comment => (
                                        <Comment comment={comment}
                                                 key={comment.id}/>
                                    ))
                                    }
                                </div>
                            )}
                            <EditPostDialog display={this.state.displayEditPost}
                                            onClose={this.onEditClose.bind(this)}
                                            post={post}/>
                            <CreateCommentDialog postId={post.id}
                                                 display={this.state.displayCreateComment}
                                                 onClose={this.onCommentClose.bind(this)}/>

                        </div> : <Redirect to="/"/>}
                    </div>)}
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
        voteOnPost: (postId, option) => dispatch(voteOnPost(postId, option)),
        deletePost: (postId) => dispatch(deletePost(postId))
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView))