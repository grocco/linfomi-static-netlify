import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'


import { setWord, showModal, toggleHamburger } from 'domain/state/actions';
import Header from 'components/connected/Header';
import Aside from 'components/connected/Aside';
import Footer from 'components/connected/Footer';
import { connect } from 'react-redux';
import i18n from 'domain/i18n';
import config from 'config';
import Modal from "./components/connected/Modal";
// import Page from "./components/connected/Page";


import './app.css'




class AppPresentational extends React.Component {

  constructor(props) {
    super(props);
    this.trackScrolling = this.trackScrolling.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  trackScrolling() {
    if (this.props.showHamburgerMenu && this.frame) {
      if(this.frame
        .getBoundingClientRect().top < 390) 
      {
        this.props.toggleHamburger();
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('scroll',this.trackScrolling);
  }

  render() {
    return (
      <Router>
        <div className="app">
          {/* <Route path="/" component={Header} /> */}
          <Header />
          {this.props.modal && <Modal
            {...this.props.modal}
          />}
          <div 
            ref={(el)=>{this.frame=el}} className={`frame ${(this.props.showHamburgerMenu ? 'selected' : '')}`}
            style={this.props.showHamburgerMenu ? {marginTop: this.props.nrButtons*80 + 81} : {}}
          >
            {/* <div className='panel' style={{height: window.innerHeight - 81 - 61 - 40 }}> */}
            {/* </div> */}
            {/* { !this.props.mobile && config.aside && <Route path="/" component={Aside} /> } */}
            { !this.props.mobile && config.aside && <Aside /> }
            <div className='main' style={{minHeight: this.props.windowInnerHeight - 81 - 61 - 20 }}>
              <Routes />
              {/* <div>Main Content</div>
              <div><input placeholder={'text input'} onChange={(e=>this.props.setWord(e.target.value))} /></div>
              <div>{ this.props.word }</div>
              <div onClick={()=>this.props.showModal({name:'EXAMPLE_MODAL'})}>Show Modalo</div> */}
            </div>
          </div>
          {/* { !this.props.mobile && <Route path="/" component={Footer} /> } */}
          { !this.props.mobile && <Footer /> }
        </div>
      </Router>
    );
  }

}

const mapStateToProps = state => ({
  word: state.ui.word,
  modal: (state.ui.currentModal ? state.ui.modalTemplates[state.ui.currentModal] : null),
  mobile: state.ui.screen.width < 1024,
  showHamburgerMenu: state.ui.showHamburgerMenu,
  windowInnerHeight: state.ui.screen.height,
  nrButtons: Object.keys(i18n.header.buttons).length + 1
});

const mapDispatchToProps = dispatch => ({
  setWord: (word) => dispatch(setWord(word)),
  showModal: (name) => dispatch(showModal(name)),
  toggleHamburger: () => dispatch(toggleHamburger())
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
