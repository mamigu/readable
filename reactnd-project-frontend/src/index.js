import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from 'redux'
import "./App.css";

import registerServiceWorker from './registerServiceWorker'
import reducer from './Reducers'
import Home from "./Components/Home";
import CategoryView from "./Components/CategoryView";
import PostView from "./Components/PostView";

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk, logger)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/:category" component={CategoryView}/>
                <Route path="/:category/:id" component={PostView}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
