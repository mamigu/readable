import React, {Component} from 'react';

export default class VoteScoreIcon extends Component {
    render() {
        return (
            <div>
                <div className="vote">
                    <span className="vote-count">{this.props.voteScore}</span>
                </div>
            </div>
        )
    }
}