import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPostsForCategory} from "../Actions/index";
import NavigationBar from "./NavigationBar";

class CategoryView extends Component {

    constructor(props){
        super(props);
        this.state = {
            category: this.props.match.params.category
        }
    }

    componentDidMount() {
        this.props.getPostsForCategory(this.state.category);
    }

    render() {
        return (
            <div>
                <NavigationBar />
            </div>)
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
        getPostsForCategory: (data) => dispatch(getPostsForCategory(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryView)