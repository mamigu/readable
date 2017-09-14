import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import connect from "react-redux/es/connect/connect";

class Dummy extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                {...this.props.children}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ...state
    }
}


export default connect(
    mapStateToProps,
)(Dummy)