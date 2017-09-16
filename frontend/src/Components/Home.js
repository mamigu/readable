import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {getAllPosts, sortPostsByProperty, getCommentsForPost} from "../Actions/index";
import * as Strings from "../Constants/Strings";
import Post from "./Post";

class Home extends Component {

    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onPostsLoaded = this.onPostsLoaded.bind(this);
    }

    componentDidMount() {
        let component = this;
        this.props.getAllPosts()
            .then(() => {
                component.onPostsLoaded();
            });
    }

    onPostsLoaded() {
        this.props.posts.forEach(post => {
            this.props.getCommentsForPost(post.id);
        });
    }

    onSelectionChange(e) {
        if(e.target.value !== "none") {
            this.props.sortPostsByProperty(e.target.value);
        }
    }

    render() {
        return (
            <div>
                <h1>Readable Project Application</h1>
                {this.props.posts.length > 0 ?
                    <div>
                        <h2>{Strings.Titles.TopPosts}</h2>
                        <div className="post-sort-box">
                            <select defaultValue="none" onChange={(e) => this.onSelectionChange(e)}>
                                <option value="none" disabled>{Strings.SortPostsBy}</option>
                                <option value="voteScore">Vote Score</option>
                                <option value="timestamp">Date</option>
                            </select>
                        </div>
                    </div>
                    : <h2>{Strings.Titles.NoPosts}</h2>
                }
                {this.props.posts.length > 0 && this.props.posts.map(post => (
                    <Post post={post}
                          key={post.id}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps (state, ownProps) {
    return {
        ...state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllPosts: (data) => dispatch(getAllPosts()),
        getCommentsForPost: (postId) => dispatch(getCommentsForPost(postId)),
        sortPostsByProperty: (prop) => dispatch(sortPostsByProperty(prop))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))
