import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createComment} from "../../Actions/index";

import * as Strings from "../../Constants/Strings";

class CreateCommentDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: "none",
            disabled: false,
            author: "",
            body: "",
        }
    }

    isValidInputs(author, body) {
        return author !== "" && body !== "" ;
    }

    onCreateComment() {
        this.setState({disabled: true});
        this.props.createComment(this.props.match.params.id, this.props.match.params.category, this.state.author, this.state.body)
            .then(() => {
                this.props.onClose();
            });
        this.setState({disabled: false});
    }

    onAuthorChange(e) {
        this.setState({
            author: e.target.value,
        })
    }

    onBodyChange(e) {
        this.setState({
            body: e.target.value
        })
    }

    render() {
        return (
            <Modal className='modal'
                   overlayClassName='overlay'
                   isOpen={this.props.display}
                   onRequestClose={this.props.onClose}
                   contentLabel='Modal'>
                <div className='create-post-container'>
                    <h3 className='subheader'>{Strings.Titles.CreateNewComment}</h3>

                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Author(required)'
                               onChange={this.onAuthorChange.bind(this)}/>
                    </div>

                    <div className="text-box">
                        <textarea className="text-input"
                                  type="text"
                                  placeholder="Description"
                                  onChange={this.onBodyChange.bind(this)}/>
                    </div>
                    <button style={{padding: "5px", marginLeft: "10px"}}
                            type='button' onClick={this.onCreateComment.bind(this)}
                            disabled={this.state.disabled || !this.isValidInputs(this.state.author, this.state.body)}>
                        {Strings.Buttons.Create}
                    </button>

                    <button style={{padding: "5px", marginLeft: "10px"}} type='button' onClick={this.props.onClose}>
                        {Strings.Buttons.Close}
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
        createComment: (postId, category, author, body) => dispatch(createComment(postId, category, author, body))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCommentDialog));