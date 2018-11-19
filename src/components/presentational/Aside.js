import React, { Component } from "react";
import { Link } from 'react-static';

class Aside extends Component {

  render() {
    return (
    <div className='aside'>
        <div className={`aside-buttons ${this.props.mobile ? ' mobile' : ''}`}>
          { this.props.buttons && this.props.buttons.map(button => 
              <button 
                key={button.key}
                className={`aside-button ${button.selected ? ' selected' : ''} ${button.featured ? ' featured' : ''}`}
                // onClick={()=>{this.props.changePage(button.key)}}
              >
                <Link to={`/${button.key}`} href={`/${button.key}`}>
                  {button.title}
                </Link>
              </button>
          )}
        </div>
    </div>)
  }

}

export default Aside;