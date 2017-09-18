import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createNewPost} from "../../Actions/index";
import * as Strings from "../../Constants/Strings";

class CreatePostDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: "none",
            disabled: false,
            title: "",
            author: "",
            body: "",
        }
    }

    onSelectionChanged(e) {
        this.setState({
            selectedCategory: e.target.value
        })
    }

    isValidInputs(title, owner, category) {
        return title !== "" && owner !== "" && category !== "none";
    }

    onCreatePost() {
        this.setState({disabled: true});
        this.props.createNewPost(this.state.title, this.state.author, this.state.body, this.state.selectedCategory).then(() => {
            this.props.onClose();
        });
        this.setState({disabled: false});
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        })
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
                    <h3 className='subheader'>{Strings.Titles.CreateNewPost}</h3>

                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Title(required)'
                               onChange={this.onTitleChange.bind(this)}/>
                    </div>
                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Author(required)'
                               onChange={this.onAuthorChange.bind(this)}/>
                    </div>

                    <div className='text-box'>
                        <select onChange={this.onSelectionChanged.bind(this)}
                                defaultValue="none">
                            <option value="none" disabled>{Strings.SelectCategory}</option>
                            {this.props.categories.length > 0 && this.props.categories.map(cat => (
                                <option value={cat.path} key={"_" + cat.path}>{cat.name}</option>
                            ))}
                        </select>
                        <span>
                            *
                        </span>
                    </div>

                    <div className="text-box">
                        <textarea className="text-input"
                                  type="text"
                                  placeholder="Description"
                                  onChange={this.onBodyChange.bind(this)}/>
                    </div>
                    <button style={{padding: "5px", marginLeft: "10px"}}
                            type='button' onClick={this.onCreatePost.bind(this)}
                            disabled={this.state.disabled || !this.isValidInputs(this.state.title, this.state.author, this.state.body, this.state.selectedCategory)}>
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
        createNewPost: (title, author, body, category) => dispatch(createNewPost(title, author, body, category))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePostDialog));