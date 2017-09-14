import React, {Component} from 'react';

import * as Utilities from "../Util/Utilities";

export default class PostBody extends Component {
    render() {
        return (
            <div className="post">
                    <span className="post-title">
                        {this.props.title}
                    </span>
                <span className="post-timestamp">
                        {Utilities.convertSecondsToDate(this.props.timestamp)}
                    </span>
            </div>
        )
    }
}