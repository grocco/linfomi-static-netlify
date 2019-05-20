import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/Header';
import i18n from 'domain/i18n';
import { changeLanguage, changePage, toggleHamburger } from 'domain/state/actions';
// import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  buttons: state.ui.menu.links[state.ui.menu.current].map(menu => ({
    title: i18n.header.buttons[menu.name].title[state.ui.language] || i18n.header.buttons[menu.name].title['en'],
    selected: menu.active,
    key: menu.name,
    submenu: menu.submenu,
    // featured: menu.name === 'donations',
    address: i18n.header.buttons[menu.name].address && i18n.header.buttons[menu.name].address[state.ui.language]
  })),
  languages: state.ui.languages,
  language: state.ui.language,
  showHamburgerMenu: state.ui.showHamburgerMenu
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language) => dispatch(changeLanguage(language)),
  changePage: (page) => dispatch(changePage(page)),
  toggleHamburger: () => dispatch(toggleHamburger())
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(Presentational);


export default Connected;