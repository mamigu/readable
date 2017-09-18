import React, {Component} from 'react';
import Modal from 'react-modal';

import * as Strings from "../../Constants/Strings";

export default class EditCommentDialog extends Component {

    constructor(props){
        super(props);

        this.state = {
            disabled: false,
            body: this.props.comment.body
        }
    }

    onClick() {
        this.setState({disabled: true});
        this.props.onUpdate(this.props.comment.id, this.state.body);
        this.setState({disabled: false});
    }

    onBodyChange(event) {
        this.setState({body: event.target.value});
    }

    render() {
        const comment = this.props.comment;
        return (
            <Modal className='modal'
                   overlayClassName='overlay'
                   isOpen={this.props.display}
                   onRequestClose={this.props.onClose}
                   contentLabel='Modal'>
                <div className='create-post-container'>
                    <h3 className='subheader'>{Strings.Titles.EditComment}</h3>

                    <div className='text-box'>
                        <input className='text-input'
                               type='text'
                               placeholder='Author'
                               disabled={true}
                               defaultValue={comment.author}/>
                    </div>

                    <div className="text-box">
                        <textarea className="text-input"
                                  type="text"
                                  placeholder="Description"
                                  defaultValue={comment.body}
                                  onChange={this.onBodyChange.bind(this)}/>
                    </div>

                    <button style={{padding: "5px", marginLeft: "10px"}}
                            type='button' onClick={this.onClick.bind(this)}
                            disabled={this.state.disabled}>
                        Update
                    </button>

                    <button style={{padding: "5px", marginLeft: "10px"}} type='button' onClick={this.props.onClose}>
                        Close
                    </button>
                </div>
            </Modal>)
    }
}
