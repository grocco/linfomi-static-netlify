import React, { Component } from 'react';
import i18n from 'domain/i18n';

export default class President extends Component {

    render() {
        const l = (s) => (s[this.props.language] || s['en']);
        return (
            <div className='page-president'>
                {/* <h1 className='title'>{l(i18n.pages.president.title)}</h1> */}
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.president.content) }} />   
            </div>
        )
    }

}