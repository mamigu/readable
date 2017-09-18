import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Post from "../Post";
import {deletePost, getCommentsForPost, getPostsForCategory} from "../../Actions/index";
import * as Strings from "../../Constants/Strings";
import * as Constants from "../../Constants/Constants";
import * as Utilities from "../../Util/Utilities";

class CategoryView extends Component {

    constructor(props){
        super(props);
        this.reloadPostsForCategory = this.reloadPostsForCategory.bind(this);

        this.state = {
            sortBy: Constants.VoteScore
        }
    }

    componentDidMount() {
        this.reloadPostsForCategory(this.props.match.params.category);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.category !== this.props.match.params.category) {
            this.reloadPostsForCategory(nextProps.match.params.category);
        }
    }

    reloadPostsForCategory(category) {
        this.props.getPostsForCategory(category)
            .then(() => {
                this.onPostsLoaded(category)
            })
    }

    onPostsLoaded(category) {
        this.props.posts[category].forEach(post => {
            this.props.getCommentsForPost(post.id, post.category);
        });
    }

    onDeletePost(postId) {
        this.props.deletePost(postId);
    }

    onSelectionChange(e) {
        if(e.target.value !== "none") {
            this.setState({sortBy: e.target.value});
        }
    }

    render() {
        const category = this.props.match.params.category;
        const posts = this.props.posts[category];
        return (
            <div>
                {this.props.categories.length > 0 && (
                    <h3>{this.props.categories.filter(cat => cat.path === category)[0].name}</h3>
                )}
                {posts && (
                    <div className="post-sort-box">
                        <select defaultValue="none" onChange={(e) => this.onSelectionChange(e)}>
                            <option value="none" disabled>{Strings.SortPostsBy}</option>
                            <option value="voteScore">Vote Score</option>
                            <option value="timestamp">Date</option>
                        </select>
                    </div>
                )}
                {posts && posts.length > 0 && (posts.sort(Utilities.comparePostsWithProp(this.state.sortBy)).map(post => (
                    <Post post={post}
                          onDeletePost={this.onDeletePost.bind(this, post.id)}
                          key={post.id}/>
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
        getCommentsForPost: (postId, category) => dispatch(getCommentsForPost(postId, category)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryView))