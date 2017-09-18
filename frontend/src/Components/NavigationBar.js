import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import CreatePostDialog from "./Dialogs/CreatePostDialog";

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createPostModal: false,
            loading: false,
            selectedCategory: "none",
            disabledSubmit: false
        };

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

    render() {

        return (
            <div>
                <ul className="navigation-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    {this.props.categories.length > 0 && this.props.categories.map(cat => (
                        <li className="nav-item" key={"_" + cat.name}>
                            <Link to={"/" + cat.path}>{cat.name}</Link>
                        </li>
                    ))}
                    <li className="nav-item">
                        <a href="#" onClick={this.openCreatePostModal.bind(this)}>Create Post</a>
                    </li>
                </ul>
                <CreatePostDialog onClose={this.closeCreatePostModal.bind(this)}
                                  display={this.state.createPostModal}/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ...state
    }
}

export default withRouter(connect(mapStateToProps)(NavigationBar));