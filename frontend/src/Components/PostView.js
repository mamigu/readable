import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getPostAndComments} from "../Actions/index";

class PostView extends Component {

    componentDidMount() {
        this.props.getPostAndComments(this.props.match.params.id);
    }

    render() {
        return (
            <div>

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
        getPostAndComments: (data) => dispatch(getPostAndComments(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView))