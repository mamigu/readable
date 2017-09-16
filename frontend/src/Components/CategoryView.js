import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import Post from "./Post";
import {getPostsForCategory} from "../Actions/index";

class CategoryView extends Component {

    componentDidMount() {
        this.props.getPostsForCategory(this.props.match.params.category);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.category !== this.props.match.params.category) {
            this.props.getPostsForCategory(nextProps.match.params.category);
        }
    }

    render() {
        return (
            <div>
                <h3>{this.props.match.params.category}</h3>
                {this.props.category.length > 0 && (this.props.category.map(post => (
                    <Link to={"/" + post.category + "/" + post.id}
                          className="post-link"
                          key={post.id}>
                        <Post post={post}/>
                    </Link>

                )))
                }
            </div>)
    }
}

function mapStateToProps (state) {
    return {
        ...state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getPostsForCategory: (data) => dispatch(getPostsForCategory(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryView))