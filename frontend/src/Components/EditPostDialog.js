import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {editPost} from "../Actions/index";
import * as Strings from "../Constants/Strings";

class EditPostDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
        }
    }

    onEditPost() {
        this.setState({disabled: true});
        this.props.editPost(this.props.currentPost.id, this.title.value, this.body.value).then(() => {
                this.props.onClose();
        });
        this.setState({disabled: false});
    }

    render() {
        const post = this.props.currentPost;
        return (
            <Modal className='modal'
                   overlayClassName='overlay'
                   isOpen={this.props.display}
                   onRequestClose={this.props.onClose}
                   contentLabel='Modal'>
                <div className='create-post-container'>
                    <h3 className='subheader'>{Strings.Titles.EditPost}</h3>

                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Title'
                               defaultValue={post.title}
                               ref={(title) => this.title = title}/>
                    </div>
                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Author'
                               disabled={true}
                               defaultValue={post.author}/>
                    </div>

                    <div className='text-box'>
                        <select disabled={true} defaultValue={post.category} readOnly>
                            {this.props.categories.length > 0 && this.props.categories.map(cat => (
                                <option value={cat.path} key={"_" + cat.path}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-box">
                        <textarea className="text-input"
                                  type="text"
                                  placeholder="Description"
                                  defaultValue={post.body}
                                  ref={(body) => this.body = body}/>
                    </div>
                    <button style={{padding: "5px", marginLeft: "10px"}}
                            type='button' onClick={this.onEditPost.bind(this)}
                            disabled={this.state.disabled}>
                        Update
                    </button>

                    <button style={{padding: "5px", marginLeft: "10px"}} type='button' onClick={this.props.onClose}>
                        Close
                    </button>
                </div>
            </Modal>
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
        editPost: (postId, title, body) => dispatch(editPost(postId, title, body))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostDialog));