import React from 'react'
import { Router, Link, Route, withRouteData, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'


import { setWord, showModal, toggleHamburger, changeLanguage } from 'domain/state/actions';
import Header from 'components/connected/Header';
import Aside from 'components/connected/Aside';
import Footer from 'components/connected/Footer';
import { connect } from 'react-redux';
import i18n from 'domain/i18n';
import config from 'config';
import Modal from "./components/connected/Modal";
// import Page from "./components/connected/Page";
import window from 'domain/window';

import './app.css'

import { triangle1, triangle2, triangle3, triangle4 } from './ui';


// This is the default renderer for `<Routes>`
const RenderRoutes = ({ getComponentForPath, side }) => (
  // The default renderer uses a catch all route to receive the pathname
  <Route
    path="*"
    render={props => {
      // The pathname is used to retrieve the component for that path
      let Comp = getComponentForPath(props.location.pathname)
      // The component is rendered!
      return <Comp key={props.location.pathname} side={side} {...props} />
    }}
  />
)


const Left = withRouteData(({ history, showHamburgerMenu, pageSlug }) => {
  const hide = history.location && history.location.state && history.location.state.slave;
  return (<div 
    className={`frame left ${hide ? 'hidden' : ''}`}
    style={{height: pageSlug === 'intro' ? '100vh' : null}}
    >
        <div>{ triangle3 }</div>
        <div>{ triangle4 }</div>
        <div className='main'>
          <Routes render={args => RenderRoutes(Object.assign({},args,{side: 'left'}))}/>
        </div>
    </div>
  )
});

const Right = withRouteData(({ history, showHamburgerMenu, pageSlug }) => {
  const show = history.location && history.location.state && history.location.state.slave;
  return (
    <div 
      // className={`frame ${(this.props.showHamburgerMenu ? 'selected' : '')}`}
      className={`frame right ${!show ? 'hide' : ''}`}
      style={{height: pageSlug === 'intro' ? '100vh' : null}}
    >
      {/* </div> */}

        { triangle1({opacity: pageSlug === 'intro' || !show ? 0.4 : null, zIndex: pageSlug === 'intro' || !show ? '1' : null, height: pageSlug === 'intro' ? '100vh' : null}) }
        { triangle2({left: pageSlug === 'intro' || !show ? 0 : null, opacity: pageSlug === 'intro' || !show ? 0.4 : null, zIndex: pageSlug === 'intro' || !show ? '1' : null, height: pageSlug === 'intro' ? '100vh' : null}) }
      <div className='main' >
        <Routes render={args => RenderRoutes(Object.assign({},args,{side: 'right'}))}/>
        {/* <div>Main Content</div>
        <div><input placeholder={'text input'} onChange={(e=>this.props.setWord(e.target.value))} /></div>
        <div>{ this.props.word }</div>
        <div onClick={()=>this.props.showModal({name:'EXAMPLE_MODAL'})}>Show Modalo</div> */}
      </div>
    </div>
  )
})

const Content = withRouteData(({showHamburgerMenu, pageSlug}) => (
  <div className={`app ${pageSlug === 'intro' ? 'intro' : ''}`} >
    {/* <Route path="/" component={Header} /> */}
    <Header />
    <div
    >
      <Left 
        showHamburgerMenu={showHamburgerMenu}
      />
      <Right
        showHamburgerMenu={showHamburgerMenu}
      />
    </div>
      {/* <Footer /> */}
  </div>
))

const Menu = withRouteData(({showHamburgerMenu, language, languages, toggleHamburger, changeLanguage, buttons, pageSlug}) => (
      <div 
        className={`hamburger-buttons ${showHamburgerMenu ? ' selected' : ''}`}
      >
      <div role='none' className={`buttonsUnderlay ${showHamburgerMenu ? 'selected' : ''}`} onClick={toggleHamburger} onKeyDown={toggleHamburger}/>

      { showHamburgerMenu && <div className='menu-triangles'>
        { triangle1({transform: 'rotateZ(270deg)'}) }
        { triangle2() }
      </div>
      }
      <div className='languages hamburger-button'>
          { languages && languages.map(_language => 
          <button 
            key={_language}
            className={`language ${_language === language ? ' selected' : ''}`}
            onClick={()=>{
                toggleHamburger();
                changeLanguage(_language);
              }
            }
          >{i18n.languages.original[_language]}</button>
          )}
      </div>
      { buttons && buttons.map(button => 
            <button 
              key={button.key}
              className={`hamburger-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
              onClick={()=>toggleHamburger()}
            >
              <Link 
                to={button.key === 'president' ? {pathname:'/council', state: { memberSlug: 'prof-franco-cavalli', slave: true}} : `/${button.key}`} 
                href={`/${button.key}`}
                activeClassName='selected'
              >
                  {button.title}
              </Link>
            </button>
        )}
        </div>
))

class AppPresentational extends React.Component {

  constructor(props) {
    super(props);
    this.trackScrolling = this.trackScrolling.bind(this);
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', this.trackScrolling);
    }
  }

  trackScrolling() {
    if (this.props.showHamburgerMenu && this.frame) {
      if(this.frame
        .getBoundingClientRect().top < this.props.nrButtons*80 + 60) 
      {
        this.props.toggleHamburger();
      }
    }
  };

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('scroll',this.trackScrolling);
    }
  }

  render() {
    return (
      <Router>
        <div>
          {this.props.modal && <Modal
          {...this.props.modal}
          />}
          <Menu
            showHamburgerMenu={this.props.showHamburgerMenu}
            language={this.props.language}
            languages={this.props.languages}
            toggleHamburger={this.props.toggleHamburger}
            changeLanguage={this.props.changeLanguage}
            buttons={this.props.buttons}
          />
          <Content
                showHamburgerMenu={this.props.showHamburgerMenu}
          />
        </div>
      </Router>
    );
  }

}

const mapStateToProps = state => ({
  word: state.ui.word,
  modal: (state.ui.currentModal ? state.ui.modalTemplates[state.ui.currentModal] : null),
  showHamburgerMenu: state.ui.showHamburgerMenu,
  nrButtons: Object.keys(i18n.header.buttons).length + 1,
  buttons: Object.keys(i18n.header.buttons).map(key => ({
    title: i18n.header.buttons[key].title[state.ui.language] || i18n.header.buttons[key].title['en'],
    selected: state.ui.page === key,
    key,
    featured: key === 'donations'
  })),
  languages: state.ui.languages,
  language: state.ui.language,
});

const mapDispatchToProps = dispatch => ({
  setWord: (word) => dispatch(setWord(word)),
  showModal: (name) => dispatch(showModal(name)),
  toggleHamburger: () => dispatch(toggleHamburger()),
  changeLanguage: (language) => dispatch(changeLanguage(language)),
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentational);

// export default App;





// const App = () => (
//   <Router>
//     <div>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/blog">Blog</Link>
//         <Link to="/council">Council</Link>
//       </nav>
//       <div className="content">
//         <Routes />
//       </div>
//     </div>
//   </Router>
// )

export default hot(module)(withSiteData(App))
