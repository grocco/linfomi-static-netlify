import { connect } from 'react-redux'
import Presentational from 'components/presentational/Header';
import i18n from 'domain/i18n';
import { changeLanguage, /* changePage, */ toggleHamburger } from 'domain/state/actions';
// import { withRouter } from "react-router-dom";
import { window } from 'domain/global';

const mapStateToProps = state => ({
  buttons: Object.keys(i18n.header.buttons).map(key => ({
    title: i18n.header.buttons[key].title[state.ui.language] || i18n.header.buttons[key].title['en'],
    selected: state.ui.page === key,
    key,
    featured: key === 'donations'
  })),
  languages: state.ui.languages,
  language: state.ui.language,
  mobile: window.innerWidth < 1024,
  showHamburgerMenu: state.ui.showHamburgerMenu
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language) => dispatch(changeLanguage(language)),
  // changePage: (page) => {dispatch(changePage(page)).then(()=>ownProps.history.push('/'+page))},
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