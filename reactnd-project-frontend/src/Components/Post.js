import React, {Component} from 'react';

import VoteScoreIcon from "./VoteScoreIcon";

export default class Post extends Component {

    render() {
        return (
            <div>
                <VoteScoreIcon score={this.props.voteScore}/>
                <div>
                    {this.props.title}
                </div>
                <div>
                    {this.props.timeStamp}
                </div>
                <div>
                    {this.props.author}
                </div>
                <div>
                    {this.props.body}
                </div>
            </div>
        );
    }
}