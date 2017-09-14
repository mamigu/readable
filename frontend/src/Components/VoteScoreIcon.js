import React, {Component} from 'react';

import AddIcon from 'react-icons/lib/md/add';
import RemoveIcon from 'react-icons/lib/md/remove';
import {connect} from "react-redux";
import * as Constants from "../Constants/Constants";
import {voteOnPost} from "../Actions/index";

class VoteScoreIcon extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event, postId, option) {
        event.preventDefault();
        this.props.voteOnPost(postId, option);
    }


    render() {
        return (
            <div className="vote">
                <div>
                    <button className="icon-btn"
                            onClick={(e) => this.onClick(e, this.props.id, Constants.UpVote)}>
                        <AddIcon size={20}/>
                    </button>
                </div>
                <div>
                    <span className="vote-count">{this.props.voteScore}</span>
                </div>
                <div>
                    <button className="icon-btn"
                            onClick={this.onClick.bind(this, Constants.DownVote)}>
                        <RemoveIcon size={20}/>
                    </button>
                </div>
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
        voteOnPost: (id, option) => dispatch(voteOnPost(id, option)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VoteScoreIcon)