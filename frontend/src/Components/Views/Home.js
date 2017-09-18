import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {getAllPosts, getCommentsForPost, deletePost} from "../../Actions/index";
import * as Strings from "../../Constants/Strings";
import Post from "../Post";
import * as Utilities from "../../Util/Utilities";
import * as Constants from "../../Constants/Constants";

class Home extends Component {

    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onPostsLoaded = this.onPostsLoaded.bind(this);

        this.state = {
            sortBy: Constants.VoteScore
        }
    }

    componentDidMount() {
        let component = this;
        this.props.getAllPosts()
            .then(() => {
                component.onPostsLoaded();
            });
    }

    onPostsLoaded() {
        this.props.categories.forEach(cat => {
            this.props.posts.hasOwnProperty(cat.path) && this.props.posts[cat.path].forEach(post => {
                this.props.getCommentsForPost(post.id, cat.path);
            });
        });
    }

    onSelectionChange(e) {
        if(e.target.value !== "none") {
            this.setState({
                sortBy: e.target.value,
            });
        }
    }

    render() {
        let posts = this.props.categories.reduce((result, cat) => {
            return this.props.posts.hasOwnProperty(cat.path) && this.props.posts[cat.path].length > 0 ? result.concat(this.props.posts[cat.path]) : result;
        },[]).sort(Utilities.comparePostsWithProp(this.state.sortBy));

        return (
            <div>
                <h1>Readable Project Application</h1>
                {posts.length > 0 ?
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
                {posts.length > 0 && posts.map(post => (
                    <Post post={post}
                          key={post.id}/>
                ))}
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
        getAllPosts: (data) => dispatch(getAllPosts()),
        getCommentsForPost: (postId, category) => dispatch(getCommentsForPost(postId, category)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))
