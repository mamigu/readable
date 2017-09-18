import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DeleteIcon from 'react-icons/lib/md/cancel';

import VoteScoreIcon from "./VoteScoreIcon";
import {voteOnComment, deleteComment, editComment} from "../Actions/index";

import * as Utilities from "../Util/Utilities";
import * as Strings from "../Constants/Strings";
import EditCommentDialog from "./Dialogs/EditCommentDialog";

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display: false
        }
    }

    onVote(commentId, option) {
        this.props.voteOnComment(commentId, this.props.match.params.category, option);
    }

    onDeleteComment() {
        this.props.deleteComment(this.props.comment.id, this.props.match.params.category);
    }

    openEditDialog() {
        this.setState({display: true});
    }

    onEditClose() {
        this.setState({display: false});
    }

    onCommentUpdate(commentId, body) {
        this.props.editComment(commentId, this.props.match.params.category, body)
            .then(() => this.onEditClose());
    }

    render() {
        const comment = this.props.comment;
        return (
            <div className="comment-container">
                <VoteScoreIcon id={comment.id}
                               voteScore={comment.voteScore}
                               onClick={this.onVote.bind(this)}/>
                <div className="comment">
                    <div>
                        <button className="icon-btn post-link"
                                onClick={this.openEditDialog.bind(this)}>
                            {Strings.Buttons.EditComment}
                        </button>
                    </div>
                    <div className="comment-details">
                        <span className="text-title">
                            {comment.body}
                        </span>

                        <span className="text-timestamp">
                            {Utilities.convertSecondsToDate(comment.timestamp)}
                        </span>
                        <button className="icon-btn"
                                style={{paddingTop: "5px", flex: "1 1 5%"}}
                                onClick={this.onDeleteComment.bind(this)}>
                            <DeleteIcon size={25}/>
                        </button>
                    </div>

                    <div className="post-author">
                        {comment.author}
                    </div>
                </div>
                <EditCommentDialog display={this.state.display}
                                   comment={comment}
                                   onUpdate={this.onCommentUpdate.bind(this)}
                                   onClose={this.onEditClose.bind(this)}/>
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
        voteOnComment: (commentId, category, option) => dispatch(voteOnComment(commentId, category, option)),
        deleteComment: (commentId, category) => dispatch(deleteComment(commentId, category)),
        editComment: (commentId, category, body) => dispatch(editComment(commentId, category, body))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));