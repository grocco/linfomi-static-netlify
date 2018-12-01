import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Link, withRouteData } from 'react-static'
import i18n from 'domain/i18n';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showHelp: true
    }
  }

  render() {
    const l = (s) => (s[this.props.language]);
    return (
    <div>
    <div className='page-slug'>{i18n.pages[this.props.pageSlug] ? l(i18n.pages[this.props.pageSlug].title) : ''}</div>
      <header>
        <div 
          className={`hamburger ${(this.props.showHamburgerMenu ? ' selected' : '')}`}
          onClick={()=>{this.props.toggleHamburger(); this.setState({ showHelp: false})}}
          onKeyDown={()=>0}
          role='none'
        >
          <div className="hamburger-line" />
          { this.state.showHelp && <div className="hamburger-description">{(this.props.showHamburgerMenu ? '' : 'MENU')}</div> }
          <div className="hamburger-line" />
          <div className="hamburger-line"/>
        </div>
        <Link 
          to='/' 
          href='/'
        >
          <div className='logo-name'>
            <div className='logo-name-inner'>
              <br/>
              {l(i18n.header.logo.forThe)}
              <br/>
              {l(i18n.header.logo.of1) || <br/> }
              {l(i18n.header.logo.of2) || ' ' }
            </div>
            {l(i18n.header.logo.foundation)}
            <br/>
            {l(i18n.header.logo.institute)}
            <br/>
            {l(i18n.header.logo.oncology)}
            <br/>
            {l(i18n.header.logo.research)}
          </div>
          <div 
            id='logo'
          />
        </Link>
        
      </header>
     
    </div>)
  }

}

export default withRouteData(Header);