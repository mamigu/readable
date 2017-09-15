import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {getAllPosts, sortPostsByProperty} from "../Actions/index";
import PostBody from "./PostBody";
import * as Strings from "../Constants/Strings";

class Home extends Component {

    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    onSelectionChange(e) {
        if(e.target.value !== "none") {
            this.props.sortPostsByProperty(e.target.value);
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div>
                <h1>Readable Project Application</h1>
                {this.props.posts.length > 0 ?
                    <div>
                        <h2>{Strings.TopPosts}</h2>
                        <div className="post-sort-box">
                            <select defaultValue="none" onChange={(e) => this.onSelectionChange(e)}>
                                <option value="none" disabled>{Strings.SortPostsBy}</option>
                                <option value="voteScore">Vote Score</option>
                                <option value="timestamp">Date</option>
                            </select>
                        </div>
                    </div>
                    : <h2>{Strings.NoPosts}</h2>
                }
                {this.props.posts.length > 0 && this.props.posts.map(post => (
                    <Link to={"/" + post.category}
                          key={post.id}>
                        <div className="post-container">
                            <PostBody title={post.title}
                                      timestamp={post.timestamp}/>
                        </div>
                    </Link>

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
        sortPostsByProperty: (prop) => dispatch(sortPostsByProperty(prop))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))
