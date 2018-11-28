import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Link, withRouteData } from 'react-static'
import config from 'config';
import i18n from 'domain/i18n';

class Header extends Component {

  render() {
    const l = (s) => (s[this.props.language] || s['en']);
    return (
    <div>
    <div className={`page-slug ${(this.props.mobile ? 'mobile' : '')}`}>{i18n.pages[this.props.pageSlug] ? l(i18n.pages[this.props.pageSlug].title) : ''}</div>
      <header>
        <div 
          className={`hamburger${(this.props.mobile ? ' mobile' : '')} ${(this.props.showHamburgerMenu ? ' selected' : '')}`}
          onClick={this.props.toggleHamburger}
          onKeyDown={()=>0}
          role='none'
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line"/>
        </div>
        {/* <div style={{ left: 80, position: 'absolute'}} >
          {l(i18n.pages[this.props.pageSlug].title)}
        </div> */}
        <Link 
          to='/' 
          href='/'
        >
          <div 
            id='logo'
            // className={`${(this.props.mobile ? ' mobile' : '')}`}
          />
        </Link>
        {/* </a> */}
        
        { config.headerButtons ? <div className={`header-buttons ${(this.props.mobile ? ' mobile' : '')}`}>
          { this.props.buttons && this.props.buttons.map(button => 
              <button 
                key={button.key}
                className={`header-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                onClick={()=>this.forceUpdate()}
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
        </div> :
        {/* <div style={{flex: 1}} >
          {this.props.buttons.find(button=>button.selected).title}
        </div> */}
        }

        {/* <div className={`languages ${this.props.mobile ? ' mobile' : ''}`}>
          { this.props.languages && this.props.languages.map(language => 
              <button 
                key={language}
                className={`language ${this.props.language === language ? ' selected' : ''}`}
                onClick={()=>this.props.changeLanguage(language)}
              >{language}</button>
          )}
        </div> */}
        {/* { this.props.mobile &&
            <div 
            className={`hamburger-buttons ${this.props.showHamburgerMenu ? ' selected' : ''}`}
            style={ (this.props.showHamburgerMenu ? {height:(this.props.buttons.length + 1) * 80}: {})}
            // style={{height: this.props.showHamburgerMenu ? window.innerHeight - 82 : 0}}
          >
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
            { this.props.buttons && this.props.buttons.map(button => 
                <button 
                  key={button.key}
                  className={`hamburger-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                  onClick={()=>this.props.toggleHamburger()}
                >
                  <Link 
                    to={`/${button.key}`} 
                    href={`/${button.key}`} 
                    activeClassName='selected'
                  >
                      {button.title}
                  </Link>
                </button>
            )}
          </div>
        } */}
      </header>
     
    </div>)
  }

}

export default withRouteData(Header);