import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Link } from 'react-static'
import config from 'config';
import { window } from 'domain/global';

class Header extends Component {

  render() {
    return (
    <div>
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
        <Link 
          to='/' 
          href='/'
        >
          <div 
            id='logo'
            className={`${(this.props.mobile ? ' mobile' : '')}`}
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
                  to={`/${button.key}`} 
                  href={`/${button.key}`}
                  activeClassName='selected'
                >
                  {button.title}
                </Link>
              </button>
          )}
        </div> :
        <div style={{flex: 1}} />
        }

        <div className={`languages ${this.props.mobile ? ' mobile' : ''}`}>
          { this.props.languages && this.props.languages.map(language => 
              <button 
                key={language}
                className={`language ${this.props.language === language ? ' selected' : ''}`}
                onClick={()=>this.props.changeLanguage(language)}
              >{language}</button>
          )}
        </div>
        { this.props.mobile &&
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
                  style={{width: window.innerWidth/this.props.languages.length}}
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
        }
      </header>
     
    </div>)
  }

}

export default Header;