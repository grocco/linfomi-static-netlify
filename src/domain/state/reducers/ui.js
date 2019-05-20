import { modalTemplates, initialUiState } from '../store/initialState';

const ui = (state = initialUiState, action) => {
  switch (action.type) {
    case "TOGGLE_HAMBURGER":
      return Object.assign({}, state, {
        showHamburgerMenu: !state.showHamburgerMenu
      })
    case "CHANGE_MENU":
      return Object.assign({}, state, {
        menu: Object.assign({}, state.menu, {
          current: action.menu
        })
      })
    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        showHamburgerMenu: false
      })
    case "CHANGE_LANGUAGE":
      return Object.assign({}, state, {
        language: action.language,
        showHamburgerMenu: false
      })
    case "SCREEN_RESIZE":
      return Object.assign({}, state, {
        screen: {
          width: action.width,
          height: action.height
        },
        showHamburgerMenu: false
      })
    case "SHOW_MODAL":
      return Object.assign({}, state, {
        loading: action.args.loading,
        currentModal: action.name,
        currentModalArguments: action.args
      })
    case "HIDE_MODAL":
      return Object.assign({}, state, {
        loading: false,
        currentModal: null,
        modalTemplates
      })
    case "SET_WORD":
      return Object.assign({}, state, {
        word: action.word
      })
    default:
      return state;
  }
}

export default ui;