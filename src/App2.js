import React from 'react'
import { Router, Link, Route, withRouteData, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'
import config from 'config';

// import {  Switch } from "react-router-dom";

import { setWord, showModal, toggleHamburger, changeLanguage, changeMenu } from 'domain/state/actions';

import Header from 'components/version_2/connected/Header';
import Aside from 'components/version_2/connected/Aside';
import Footer from 'components/version_2/connected/Footer';
import Modal from "components/version_2/connected/Modal";

// import Page from "./components/version_2/connected/Page";
import { connect } from 'react-redux';
import i18n from 'domain/i18n';
import window from 'domain/window';

import Intro from 'components/version_2/connected/pages/Intro';
import Home from 'components/version_2/connected/pages/Home';
import Council from 'components/version_2/connected/pages/Council';
import Donations from 'components/version_2/connected/pages/Donations';
import History from 'components/version_2/connected/pages/History';
import President from 'components/version_2/connected/pages/President';

import './app2.css'

import { triangle1, triangle2, triangle3, triangle4 } from './ui';


// This is the default renderer for `<Routes>`
const RenderRoutes = ({ getComponentForPath, side }) => (
  // The default renderer uses a catch all route to receive the pathname
  <Route
    path="*"
    render={props => {
      // The pathname is used to retrieve the component for that path
      // let Comp = getComponentForPath(props.location.pathname)
      // The component is rendered!
      // return <Comp key={props.location.pathname} side={side} {...props} >
        return (
          <div>
            <div id='menu1home' className='menuLocator' >menu1</div>
            <Intro {...props} current={props.location.pathname === '/home'} />
            <div id='menu2foundation' className='menuLocator'  >menu2</div>
            <Home {...props} current={props.location.pathname === '/foundation'} />
            <div id='menu2ior' className='menuLocator'  >menu2</div>
            <Home {...props} current={props.location.pathname === '/ior'} reality='ior' />
            <div id='menu2ielsg' className='menuLocator'  >menu2</div>
            <Home {...props} current={props.location.pathname === '/ielsg'} reality='ielsg' />
            <div id='menu2icml' className='menuLocator'  >menu2</div>
            <Home {...props} current={props.location.pathname === '/icml'} reality='icml' />
            <div id='menu1council' className='menuLocator'  >menu1</div>
            <Council {...props} current={props.location.pathname === '/council' || props.location.pathname === '/members'} />
            <div id='menu1scientific' className='menuLocator'  >menu1</div>
            <Council {...props} scientific current={props.location.pathname === '/scientific'} />
            <div id='menu1donations' className='menuLocator'  >menu1</div>
            <Donations {...props} current={props.location.pathname === '/donations-and-contacts'} />
            {/* <History {...props} current={props.location.pathname === '/hostory'} /> */}
            {/* <President {...props} current={props.location.pathname === '/president'} /> */}
            <Footer />
          </div>
        )
    }}
  />
)


const Content = withRouteData(({ pageSlug }) => (
  <div className={`app ${pageSlug === 'intro' ? 'intro' : ''}`} >
    {/* <Route path="/" component={Header} /> */}
    <Header />
    <div className='main' >
        <Routes render={args => RenderRoutes(Object.assign({},args,{}))}/>
        {/* <div>Main Content</div>
        <div><input placeholder={'text input'} onChange={(e=>this.props.setWord(e.target.value))} /></div>
        <div>{ this.props.word }</div>
        <div onClick={()=>this.props.showModal({name:'EXAMPLE_MODAL'})}>Show Modalo</div> */}
      </div>
    {/* <div
    >
      <Left 
        showHamburgerMenu={showHamburgerMenu}
      />
      <Right
        showHamburgerMenu={showHamburgerMenu}
      />
    </div> */}
      {/* <Footer /> */}
  </div>
))

class AppPresentational extends React.Component {

  componentDidMount() {
    if(window) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if(window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = () => {
    // console.log('body', window.pageYOffset)
    // console.log('menu1', document.getElementById('menu1').offsetTop)
    // console.log('menu2', document.getElementById('menu2').offsetTop)
    // console.log('menu3', document.getElementById('menu3').offsetTop)
    let currentMenu = this.props.menus[0];
    this.props.menus.forEach(
      menu => {
        if (window && window.pageYOffset + 102 > document.getElementById(menu).offsetTop) currentMenu = menu
      }
    )
    if (this.props.currentMenu !== currentMenu) this.props.changeMenu(currentMenu);
  };

  render() {
    return (
        <Router>
          <div>
            {this.props.modal && <Modal
            {...this.props.modal}
            />}
            <Header />
            {/* <Menu
              showHamburgerMenu={this.props.showHamburgerMenu}
              language={this.props.language}
              languages={this.props.languages}
              toggleHamburger={this.props.toggleHamburger}
              changeLanguage={this.props.changeLanguage}
              buttons={this.props.buttons}
            /> */}
            <div className=''>
                <Routes render={args => RenderRoutes(Object.assign({},args,{}))} />
{/*                   
                  <Switch>                 
                    <Route path={`/home`} component={Container} />
                    <Route path={`/history`} component={Container} />
                    <Route path={`/president`} component={Container} />
                    <Route path={`/donations`} component={Container} />
                    <Route path={`/council`} component={Container} />
                    <Route path={`/donations`} component={Container} />
                  </Switch>
                </Routes> */}

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
  // buttons: Object.keys(i18n.header.buttons).map(key => ({
  //   title: i18n.header.buttons[key].title[state.ui.language] || i18n.header.buttons[key].title['en'],
  //   selected: state.ui.page === key,
  //   key,
  //   featured: key === 'donations'
  // })),
  languages: state.ui.languages,
  language: state.ui.language,
  currentMenu: state.ui.menu.current,
  menus: Object.keys(state.ui.menu.links)
});

const mapDispatchToProps = dispatch => ({
  setWord: (word) => dispatch(setWord(word)),
  showModal: (name) => dispatch(showModal(name)),
  toggleHamburger: () => dispatch(toggleHamburger()),
  changeLanguage: (language) => dispatch(changeLanguage(language)),
  changeMenu: (menu) => dispatch(changeMenu(menu)),
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
