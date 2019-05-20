import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Link, withRouteData } from 'react-static'
import { changeLanguage } from 'domain/state/actions';
import i18n from 'domain/i18n';
import window from 'domain/window';

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
    {/* <div className={`page-slug ${this.props.pageSlug === 'intro' ? 'intro' : ''}`}>{i18n.pages[this.props.pageSlug] ? l(i18n.pages[this.props.pageSlug].title) : ''}</div> */}
      <header  className={this.props.pageSlug === 'intro' ? 'intro' : ''}>
        {/* <div 
          className={`hamburger ${(this.props.showHamburgerMenu ? ' selected' : '')}`}
          onClick={()=>{this.props.toggleHamburger(); this.setState({ showHelp: false})}}
          onKeyDown={()=>0}
          // style={{marginTop: this.props.pageSlug === 'intro' ? 81 + 20 : null, marginLeft: this.props.pageSlug === 'intro' ? - 81 + 20 : null}}
          role='none'
        >
          <div className="hamburger-line" />
          <div className="hamburger-description">{(this.props.showHamburgerMenu ? '' : 'MENU')}</div>
          <div className="hamburger-line" />
          <div className="hamburger-line"/>
        </div> */}
        <div id='nav' className='menu'>
          <div className='menu-buttons'>
          { this.props.buttons && this.props.buttons.filter(button=>!button.submenu).map(button => 
              {
                if (button.key.startsWith('link')) {
                  return (
                    <div 
                      key={button.key}
                      className={`menu-button link ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                      // onClick={()=>{this.props.changePage(button.key)}}
                    >
                      <div>Official Website</div>
                      <a href={button.address}>{button.title}</a>
                    </div>
                  )
                }
                return (
                  <div 
                    key={button.key}
                    className={`menu-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                    // onClick={()=>{this.props.changePage(button.key)}}
                  >
                    {/* <Link to={ { pathname: `/${button.key}`, state: { reality: button.reality} } } href={`/${button.key}`}>
                      {button.title}
                    </Link> */}
                    <div onClick={()=> this.props.history.replace(`/${button.key}`, { reality: button.key}).then(()=> {
                      {/* window.requestAnimationFrame(()=>{ */}
                          window.server && window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
                      {/* })  */}
                      })} >{button.title}</div>
                  </div>
                )
              }
            )
          }
          </div>

          <div className='menu-buttons submenu'>
          { this.props.buttons && this.props.buttons.filter(button=>button.submenu).map(button => 
            (
                  <div 
                    key={button.key}
                    className={`menu-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                    // onClick={()=>{this.props.changePage(button.key)}}
                  >
                    {/* <Link to={ { pathname: `/${button.key}`, state: { reality: button.reality} } } href={`/${button.key}`}>
                      {button.title}
                    </Link> */}
                    <div onClick={()=> this.props.history.replace(`/${button.key}`, { reality: button.key}).then(()=> {
                      {/* window.requestAnimationFrame(()=>{ */}
                          window.server && window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
                      {/* })  */}
                      })} >{button.title}</div>
                  </div>
                )
          )
          }
          </div>
          <div className='languages'>
            { this.props.languages && this.props.languages.map(_language => 
            <div 
              key={_language}
              className={`language ${_language === this.props.language ? ' selected' : ''}`}
              onClick={()=>{
                  this.props.changeLanguage(_language);
                }
              }
            >{i18n.languages.original[_language]}</div>
            )}
          </div>
        {/* <Link 
          to='/' 
          href='/'
          onClick={()=>this.props.changePage('intro')}
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
        </Link> */}
        
        </div>
      </header>
     
    </div>)
  }

}

export default withRouteData(Header);