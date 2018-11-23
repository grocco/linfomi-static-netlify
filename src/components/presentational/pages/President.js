import React, { Component } from 'react';
import i18n from 'domain/i18n';

export default class President extends Component {

    renderRight() {
        const l = (s) => (s[this.props.language] || s.en);
        return (
            <div className='page-president padded'>
                {/* <div className='title'>{l(i18n.pages.president.title)}</div> */}
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.president.content) }} />   
            </div>
        )
    }

    render() {
        const l = (s) => (s[this.props.language] || s.en);
        if (this.props.side === 'right') {
            return this.renderRight();
        }
        return (
            <div className='president'>
                <img src='/assets/president.jpg' alt='the president' />
                <div>{l(i18n.pages.president.title)}</div>
            </div>
        )
    }

}