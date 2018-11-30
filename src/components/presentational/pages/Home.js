import React, { Component } from 'react';
import i18n from 'domain/i18n';
import { Link } from 'react-static';

export default class Home extends Component {

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        return (
            <div className='page-home padded'>
                {/* <Link to={{pathname:'/home/', state: { reality: 'history'}}} href='/home'>
                    <div >
                        <div >{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                        <div >{l(i18n.pages.home.content.realities.fior.title)}</div>
                    </div>
                </Link> */}
                <div className='home-intro'>
                    <Link to={{pathname:'/council', state: { memberSlug: 'president', slave: true}}} href='/president'>
                        <div className='highlighted-image-left' id='president-pic' style={{backgroundImage: `url('/assets/president.jpg')`}}/>
                    </Link>
                    <div className='thanks-and-introduction'>
                        <div>{l(i18n.pages.home.content.thanks)}</div >
                        <div className='mt-480'><br/>{l(i18n.pages.home.content.realities.introduction)}</div >
                        
                    </div>
                </div>
                <div style={{clear: 'left'}} />
                <div className='lt-480'><br/><div className='bubble'>{l(i18n.pages.home.content.realities.introduction)}</div ></div>
                        
                <div className='realities'>
                    <Link to={{pathname:'/home/', state: { reality: 'ior', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'ior' ? 'selected' : ''}`}>
                            <div className='acronym'><div className='enumeration'>1.</div> {l(i18n.pages.home.content.realities.ior.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.ior.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link>
                    <Link to={{pathname:'/home/', state: { reality: 'ielsg', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'ielsg' ? 'selected' : ''}`}>
                            <div className='acronym'><div className='enumeration'>2.</div> {l(i18n.pages.home.content.realities.ielsg.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.ielsg.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link>
                    <Link to={{pathname:'/home/', state: { reality: 'icml', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'icml' ? 'selected' : ''}`}>
                            <div className='acronym'><div className='enumeration'>3.</div> {l(i18n.pages.home.content.realities.icml.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.icml.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link>
                    <Link to={{pathname:'/home/', state: { reality: 'history', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'history' ? 'selected' : ''}`}>
                            <div className='acronym'>{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link>
                </div>
                <div className='bubble' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
                <br/>
                <Link className='bubble' to={{pathname:'/council', state: { memberSlug: 'president', slave: true}}} href='/council'>
                    <img id='president-signature' src='/assets/signature-cavalli.png' alt='signature'/>
                    <div>{l(i18n.pages.home.content.signature.name)}
                        <br/><br/>
                        {l(i18n.pages.home.content.signature.description)}
                    </div >
                </Link>
            </div>
        )
    }

    
    renderRight() {
        const l = (s) => (s[this.props.language] || s.en);
        const ior = (
            <div>
                <img className='card-img-wrap-left' src='/assets/IOR_logo.gif' alt='ior logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
                <a className={'external-link'} href='http://www.ior.iosi.ch/' target='__blank'>
                    <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                    <div className='title'>{l(i18n.pages.home.content.realities.ior.title)}</div>
                    <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                </a>
            </div>
        );
        const ielsg = (
            <div>
                <img className='card-img-wrap-left' src='/assets/ielsg.jpg' alt='ielsg logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
                <a className={'external-link'} href='http://www.ielsg.org/' target='__blank'>
                    <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                    <div className='title'>{l(i18n.pages.home.content.realities.ielsg.title)}</div>
                    <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                </a>
            </div>
        );
        const icml = (
            <div>
                <img className='card-img-wrap-left' src='/assets/icml_logo.png' alt='icml logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
                <a className={'external-link'} href='http://www.lymphcon.ch/' target='__blank'>
                    <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                    <div className='title'>{l(i18n.pages.home.content.realities.icml.title)}</div>
                    <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                </a>            
            </div>
        );
        const history = (
            <div className='page-history'>
                {/* <div className='title'>{l(i18n.pages.history.title)}</div> */}
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.history.content) }} />   
            </div>
        )
        if ( ! this.props.location.state ) return history;
        switch( this.props.location.state.reality) {
            case 'ior':
                return ior;
            case 'ielsg':
                return ielsg;
            case 'icml':
                return icml;
            case 'history':
                return history;
            default:
                return history;
        }

        // return (
        //     <div>
        //         <div>
        //             {/* <div className={'card-title'} >
        //                 <div className={'card-h2'}>{l(i18n.pages.home.content.realities.ior.acronym)}</div>
        //                 <div className={'card-h3'}>{l(i18n.pages.home.content.realities.ior.title)}</div>
        //             </div> */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100%'} src={'/assets/IOR_logo.gif'} />
        //                 <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
        //             </div>
        //         </div>
        //         <div >
        //             {/* <div className={'card-title'} >
        //                 <div className={'card-h2'}>{l(i18n.pages.home.content.realities.ielsg.acronym)}</div>
        //                 <div className={'card-h3'}>{l(i18n.pages.home.content.realities.ielsg.title)}</div>
        //             </div>                             */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100'} src={'/assets/ielsg.jpg'} />
        //                 <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
        //             </div>
        //         </div>
        //         <div>
        //             {/* <div className={'card-title'} >
        //                 <div className={'card-h2'}>{l(i18n.pages.home.content.realities.icml.acronym)}</div>
        //                 <div className={'card-h3'}>{l(i18n.pages.home.content.realities.icml.title)}</div>
        //             </div>                             */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100'} src={'/assets/icml_logo.png'} />
        //                 <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
        //             </div>
        //         </div>
        //     </div>
        // )
        
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        const l = (s) => (s[this.props.language] || s.en);
         //   <div className='breadcrumbs' onClick={this.props.history.goBack}>{'< back'}</div> 
        return (<div className='padded'>
            { this.props.location.state && this.props.location.state.slave && 
                <div className="breadcrumbs" onClick={this.props.history.goBack}>
                    <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
                    <div className='go-back'>{l(i18n.navigation.back)}</div>
                </div>
            }
            {this.renderRight()}
        </div>);
    }

}