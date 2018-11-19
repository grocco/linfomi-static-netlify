import React from "react";
// import store from 'domain/state/store';
import { connect } from 'react-redux';
import { window } from 'domain/global';


class StringStateInjector extends React.Component {
  render() {
    const {
      word,
      args
    } = this.props;
    const text = this.props.text;
    const finalText = text
    .replace("/word/", word)
    .replace("/code/", args.code || '')
    .replace("/amount/", args.amount || '')
    .replace("/email/", args.email || '')
    .replace("/description/", args.description || '')
    return finalText
  }
}

const mapStateToProps = state => ({
    word: state.ui.word,
    args: state.ui.currentModalArguments || {}
});

const ReadFromState = connect(mapStateToProps)(StringStateInjector)


export const modalTemplates = {
  EXAMPLE_MODAL: {
    title: 'Example Title',
    content: <div className='modal-text'><br/>Example text.<br/>On a new line.<br/><br/>Two lines lower<br/><br/>With a special word injected from state <ReadFromState text="/word/"/>.<br/><br/><label><input id='acceptTOC' type="checkbox" value="true" /> Don't ask me again</label><br/></div>,
    buttonLeft: {
      text: "CANCEL",
      action: "HIDE_MODAL"
    },
    buttonRight: {
      text: "EXAMPLE OK BUTTON",
      action: "HIDE_MODAL"
    },
    closeable: true
  },
  SCREEN_TOO_SMALL: {
    title: 'Screen is too small',
    content: <div className='modal-text'>Your screen is too small (less than 960x640).</div>,
    buttonLeft: null,
    buttonRight: null,
    closeable: false
  },
  DONATION_START: {
    title: 'Transaction in progress',
    content: <div className='modal-text'>We are processing your transaction.<br/><ReadFromState text="/description/"/></div>,
    buttonLeft: null,
    buttonRight: null,
    closeable: false
  },
  DONATION_SUCCESSFUL: {
    title: 'Thank you for your donation!',
    content: <div className='modal-text'>You donated <ReadFromState text="/amount/"/> CHF.<br/>A receipt has been sent to <ReadFromState text="/email/"/></div>,
    buttonLeft: {
      text: "OK",
      action: "HIDE_MODAL"
    },
    closeable: true
  },
};

export const initialUiState = { 
  language: 'en', 
  languages: ['en', 'it', 'fr'],// 'fr', ],//'de', 'es'],
  page: 'home',
  modalTemplates, 
  currentModal: null, 
  word: "the initial word",
  showHamburgerMenu: false,
  screen: {
    width: window.innerWidth,
    height: window.innerHeight
  }
}
