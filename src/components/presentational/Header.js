import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Link, withRouteData } from 'react-static'
import i18n from 'domain/i18n';

class Header extends Component {

  render() {
    const l = (s) => (s[this.props.language] || s.en);
    return (
    <div>
    <div className='page-slug'>{i18n.pages[this.props.pageSlug] ? l(i18n.pages[this.props.pageSlug].title) : ''}</div>
      <header>
        <div 
          className={`hamburger ${(this.props.showHamburgerMenu ? ' selected' : '')}`}
          onClick={this.props.toggleHamburger}
          onKeyDown={()=>0}
          role='none'
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line"/>
        </div>
        <Link 
          to='/' 
          href='/'
        >
          <div className='logo-name'><div className='logo-name-inner'><br/>{"per l'"}<br/><br/>{"di"}</div>{"Fondazione"}<br/>{"Istituto"}<br/>{"Oncologico"}<br/>{"Ricerca"}</div>
          <div 
            id='logo'
          />
        </Link>
        
      </header>
     
    </div>)
  }

}

export default withRouteData(Header);