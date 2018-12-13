import React, { Component } from "react";

//Full screen modal
class Modal extends Component {

  render() {
    return (<div className='modal'>
      {/* {this.renderHeader()} */}
      <div className='modal-container'>
        <div className='modal-title'>{this.props.title}</div>
        <div className='modal-content'>{this.props.content}</div>
        <div className='modal-buttons-container'>
          {this.props.buttonLeft && <button onClick={()=>this.props.buttonClick(this.props.buttonLeft.action)}>{this.props.buttonLeft.text}</button>}
          {this.props.buttonRight && <button onClick={()=>this.props.buttonClick(this.props.buttonRight.action)} style={{ background: 'white', color: 'black' }}>{this.props.buttonRight.text}</button>}
        </div>
      </div>
    </div>)
  }

  renderHeader() {
    return <header>
     <div id='logo' className={this.props.loading ? "spinning" : ""}></div>
      <div className='right pointer close-modal' onClick={() => this.closeModal()} style={(this.props.closeable) ? {} : { display: 'none' }}>
        CLOSE <img src='/assets/cross.svg' />
      </div>
    </header>
  }

  renderButtonsContainer() {
    return <header>
      <div id='logo'></div>
      <div className='right pointer close-modal' onClick={() => this.closeModal()} style={(this.props.closeable) ? {} : { display: 'none' }}>
        CLOSE <img src='/assets/cross.svg' />
      </div>
    </header>
  }

  closeModal() {
    if (this.props.closeable) {
      this.props.hideModal();
    }
  }

}

export default Modal;