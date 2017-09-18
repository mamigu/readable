import React, {Component} from 'react';

import UpArrow from 'react-icons/lib/md/arrow-drop-up';
import DownArrow from 'react-icons/lib/md/arrow-drop-down';
import * as Constants from "../Constants/Constants";

export default class VoteScoreIcon extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event, id, option) {
        event.preventDefault();
        this.props.onClick(id, option);
    }

    render() {
        return (
            <div className="vote">
                <div>
                    <button className="icon-btn"
                            onClick={(e) => this.onClick(e, this.props.id, Constants.UpVote)}>
                        <UpArrow size={30}/>
                    </button>
                </div>
                <div>
                    <span className="vote-count">{this.props.voteScore}</span>
                </div>
                <div>
                    <button className="icon-btn"
                            onClick={(e) => this.onClick(e, this.props.id, Constants.DownVote)}>
                        <DownArrow size={30}/>
                    </button>
                </div>
            </div>
        )
    }
}