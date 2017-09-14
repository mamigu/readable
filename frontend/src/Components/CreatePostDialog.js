import React, {Component} from 'react';
import Modal from 'react-modal';

export default class CreatePostDialog extends Component {

    render() {
        return (
            <Modal className='modal'
                   overlayClassName='overlay'
                   isOpen={this.props.display}
                   onRequestClose={this.props.onClose}
                   contentLabel='Modal'>
                <div>
                    <div className='post-container'>
                        <h3 className='subheader'>
                            Create New Post
                        </h3>

                        <div className='text-box'>
                            <input className='text-input'
                                   type='text'
                                   placeholder='Title'
                                   ref={(title) => this.title = title}/>
                        </div>
                        <div className='text-box'>
                            <input className='text-input'
                                   type='text'
                                   placeholder='Author'
                                   ref={(owner) => this.owner = owner}/>
                        </div>

                        <div className='text-box'>
                            <select onChange={(e) => {this.props.onSelectionChanged(e);}}
                                    defaultValue={this.props.defaultValue}>
                                <option value="none" disabled>Select category...</option>
                                <option value={"exercise"}>Exercise</option>
                                <option value={"diet"}>Diet</option>
                                <option value={"miscellaneous"}>Miscellaneous</option>
                            </select>
                        </div>

                        <div className="text-box">
                                <textarea className="text-input"
                                          type="text"
                                          placeholder="Description"
                                          ref={(body) => this.body = body}/>
                        </div>
                        <button style={{padding: "5px", marginLeft: "10px"}}
                                type='button' onClick={() => {this.props.onCreateNewPost(this.title.value, this.owner.value, this.body.value);}}
                                disabled={this.props.buttonDisabled}>
                            Create
                        </button>

                        <button style={{padding: "5px", marginLeft: "10px"}} type='button' onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}