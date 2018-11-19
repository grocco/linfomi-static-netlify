import React, { Component } from 'react';
import i18n from 'domain/i18n';

export default class History extends Component {

    render() {
        const l = (s) => (s[this.props.language] || s['en']);
        return (
            <div className='page-history'>
                <h1 className='title'>{l(i18n.pages.history.title)}</h1>
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.history.content) }} />   
            </div>
        )
    }

}