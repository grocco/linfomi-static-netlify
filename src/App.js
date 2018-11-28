import React from 'react'
import { Router, Link, Route, withRouteData } from 'react-static'
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

import './app.css'

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


const Left = withRouteData(({ history, showHamburgerMenu }) => {
  const hide = history.location && history.location.state && history.location.state.slave;
  return (<div 
    className={`frame left ${hide ? 'hidden' : ''}`}
    >
        <div className='main' style={{ opacity: showHamburgerMenu ? 0.1 : 1 }}>
          <Routes render={args => RenderRoutes(Object.assign({},args,{side: 'left'}))}/>
        </div>
    </div>
  )
});

const Right = withRouteData(({ history, showHamburgerMenu }) => {
  const show = history.location && history.location.state && history.location.state.slave;
  return (
    <div 
      // className={`frame ${(this.props.showHamburgerMenu ? 'selected' : '')}`}
      className={`frame right ${!show ? 'hide' : ''}`}
    >
      {/* </div> */}
      <div className='main' style={{ opacity: showHamburgerMenu ? 0.1 : 1 }}>
        <Routes render={args => RenderRoutes(Object.assign({},args,{side: 'right'}))}/>
        {/* <div>Main Content</div>
        <div><input placeholder={'text input'} onChange={(e=>this.props.setWord(e.target.value))} /></div>
        <div>{ this.props.word }</div>
        <div onClick={()=>this.props.showModal({name:'EXAMPLE_MODAL'})}>Show Modalo</div> */}
      </div>
    </div>
  )
})

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
            <div 
              className={`hamburger-buttons ${this.props.showHamburgerMenu ? ' selected' : ''}`}
              style={ (this.props.showHamburgerMenu ? {maxHeight:(this.props.buttons.length + 1) * 80}: {})}
            >
            <div role='none' className='buttonsUnderlay' onClick={this.props.toggleHamburger} onKeyDown={this.props.toggleHamburger}/>
            <div className='languages hamburger-button'>
                { this.props.languages && this.props.languages.map(language => 
                <button 
                  key={language}
                  className={`language ${this.props.language === language ? ' selected' : ''}`}
                  onClick={()=>{
                      this.props.toggleHamburger();
                      this.props.changeLanguage(language);
                    }
                  }
                >{language}</button>
                )}
            </div>
            <div>
            { this.props.buttons && this.props.buttons.map(button => 
                <button 
                  key={button.key}
                  className={`hamburger-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                  onClick={()=>this.props.toggleHamburger()}
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
          </div>
        <div className="app">
          {/* <Route path="/" component={Header} /> */}
          <Header />
          {this.props.modal && <Modal
            {...this.props.modal}
          />}
          <div
            ref={(el)=>{this.frame=el}} 
          >
            <Left 
              showHamburgerMenu={this.props.showHamburgerMenu}
            />
            <Right
              showHamburgerMenu={this.props.showHamburgerMenu}
            />
          </div>
           {/* <Footer /> */}
        </div>
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

export default hot(module)(App)
