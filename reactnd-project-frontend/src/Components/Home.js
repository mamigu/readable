import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {getAllPosts, getAllCategories} from "../Actions/index";
import PostBody from "./PostBody";

class Home extends Component {

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        return (
            <div>
                <h1>Readable Project Application</h1>
                <h3>Finally, an off-screen menu that doesn't require a bunch of Javascript to work. </h3>

                <p>This concept relies on the <code>:checked</code> pseudo-selector as well as the general sibling
                    <code>~</code> selector, so it has decent browser support.</p>
                <p><strong>Browsers supported:</strong> IE9+, Firefox 3.5+, Chrome any, Safari 3.2+, Opera 9.5+</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi vero nisi eos sed qui natus, ut eius
                    reprehenderit error nesciunt veniam aliquam nulla itaque labore obcaecati molestiae eveniet,
                    perferendis provident amet perspiciatis expedita accusantium! Eveniet, quos voluptas et, labore
                    natus, saepe unde est nulla sit eaque tempore debitis accusantium. Recusandae.</p>
                <p>Demo by Austin Wulf. <a href="http://www.sitepoint.com/pure-css-off-screen-navigation-menu">See
                    article</a>.</p>
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
        getAllCategories: () => dispatch(getAllCategories()),
        getAllPosts: (data) => dispatch(getAllPosts()),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))
