import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from "react-redux";

import NavigationBar from "./NavigationBar";
import Home from "./Home";
import CategoryView from "./CategoryView";
import PostView from "./PostView";
import {getAllCategories} from "../Actions/index";

class App extends Component {

    componentWillMount() {
        this.props.getAllCategories();
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/:category" component={CategoryView}/>
                    <Route exact path="/:category/:id" component={PostView}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: () => dispatch(getAllCategories())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
