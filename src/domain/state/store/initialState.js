// import store from 'domain/state/store';
import window from 'domain/window';
import i18n from 'domain/i18n';

export const modalTemplates = {
  DONATION_START: {
    title: i18n.modal.DONATION_START.title,
    content: i18n.modal.DONATION_START.content,
    buttonLeft: null,
    buttonRight: null,
    closeable: false
  },
  DONATION_SUCCESSFUL: {
    title: i18n.modal.DONATION_SUCCESSFUL.title,
    content: i18n.modal.DONATION_SUCCESSFUL.content,
    buttonLeft: {
      text: i18n.modal.DONATION_SUCCESSFUL.buttonLeft.text,
      action: "HIDE_MODAL"
    },
    closeable: true
  },
};

export const initialUiState = { 
  language: 'en', 
  languages: ['en', 'it'],// 'fr', ],//'de', 'es'],
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
