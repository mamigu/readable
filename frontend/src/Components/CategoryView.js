import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPostsForCategory} from "../Actions/index";
import NavigationBar from "./NavigationBar";
import Post from "./Post";
import PostBody from "./PostBody";
import {Link, withRouter} from "react-router-dom";

class CategoryView extends Component {

    componentDidMount() {
        this.props.getPostsForCategory(this.props.match.params.category);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.category !== this.props.match.params.category || nextProps.category.length !== this.props.category.length) {
            this.props.getPostsForCategory(nextProps.match.params.category);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.match.params.category !== this.props.match.params.category || nextProps.category.length !== this.props.category.length;
    }

    render() {
        return (
            <div>
                {this.props.category.length > 0 && (this.props.category.map(post => (
                    <Link to={"/" + post.category + "/" + post.id}
                          key={post.id}>
                        <div className="post-container">
                            <PostBody title={post.title}
                                      timestamp={post.timestamp}/>
                        </div>
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