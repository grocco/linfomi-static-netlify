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
                <img src='https://ucarecdn.com/4dece25b-6ccd-45c2-8edd-0689eb017984/-/crop/2763x2736/0,431/-/preview//-/scale_crop/220x220/' alt='the president' />
                <div>{l(i18n.pages.president.title)}</div>
            </div>
        )
    }

}