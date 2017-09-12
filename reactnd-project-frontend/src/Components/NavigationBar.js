import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {createNewPost} from "../Actions/index";
import CreatePostDialog from "./CreatePostDialog";

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createPostModal: false,
            loading: false,
            selectedCategory: "none",
            disabledSubmit: false
        };

        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onCreateNewPost = this.onCreateNewPost.bind(this);
    }

    openCreatePostModal() {
        this.setState({
            createPostModal: true,
        })
    }

    closeCreatePostModal() {
        this.setState({
            createPostModal: false
        })
    }

    onSelectionChanged(event) {
        this.setState({
            selectedCategory: event.target.value,
        })
    }

    onCreateNewPost(title, body, owner) {
        this.setState({disabled: true});
        let component = this;
        if(this.state.selectedCategory !== "none") {
            setTimeout(() => {
                this.props.createNewPost(title, body, owner, this.state.selectedCategory);
                component.setState({disabled: false, createPostModal: false});
            })
        }
    }

    render() {

        return (
            <div>
                <ul className="navigation-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/exercise">Exercise</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/diet">Diet</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/miscellaneous">Miscellaneous</Link>
                    </li>
                    <li className="nav-item">
                        <a href="#" onClick={this.openCreatePostModal.bind(this)}>Create Post</a>
                    </li>
                </ul>
                <CreatePostDialog onSelectionChanged={this.onSelectionChanged}
                                  onCreateNewPost={this.onCreateNewPost}
                                  onClose={this.closeCreatePostModal.bind(this)}
                                  display={this.state.createPostModal}
                                  defaultValue={this.props.match ? this.props.match.params.category : "none"}
                                  buttonDisabled={this.state.selectedCategory === "none" || this.state.disabledSubmit}/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const categories = state.categories;
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createNewPost: (data) => dispatch(createNewPost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar)