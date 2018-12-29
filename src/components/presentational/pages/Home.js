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
                        <div id='president-pic' style={{backgroundImage: `url('https://ucarecdn.com/4dece25b-6ccd-45c2-8edd-0689eb017984/-/crop/2763x2736/0,431/-/preview//-/scale_crop/140x140/')`}}/>
                    </Link>
                    <div className='thanks-and-introduction'>
                        <div>{l(i18n.pages.home.content.thanks)}</div >
                        <div className='mt-480'><br/>{l(i18n.pages.home.content.realities.introduction)}</div >
                        
                    </div>
                </div>
                <div style={{clear: 'left'}} />
                <div className='lt-480'><br/><div className='bubble'>{l(i18n.pages.home.content.realities.introduction)}</div ></div>
                        
                <div className='realities'>
                    <Link to={{pathname:'/home/', state: { reality: 'history', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'history' ? 'selected' : ''}`}>
                            <div className='acronym'>{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link>
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
                    {/* <Link to={{pathname:'/home/', state: { reality: 'history', slave: true}}} href='/home'>
                        <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'history' ? 'selected' : ''}`}>
                            <div className='acronym'>{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                            <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link> */}
                    
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
            <div className='content'>
                <div className='aside-left'>
                    <div className="image " style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.ior)}')` }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.address) }} />
                </div>
                <div className='aside-right'>
                    <img  className='article-top-image' src="/assets/example1.jpg" /> 
                    <div className='padded' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
                    <a className={'external-link'} href='http://www.ior.iosi.ch/' target='__blank'>
                        <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                        <div className='title'>{l(i18n.pages.home.content.realities.ior.title)}</div>
                        <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                    </a>
                </div>
            </div>
        );
        const ielsg = (
            <div className='content'>
                <div className='aside-left'>
                    <div className="image " style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.ielsg)}')` }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.address) }} />
                </div>
                <div className='aside-right'>
                <img  className='article-top-image' src="https://ucarecdn.com/50483b97-e86f-4b87-9b9e-df1cccb8f083/-/preview//-/resize/800x/" /> 

                    <div className='padded' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
                    <a className={'external-link'} href='http://www.ielsg.org/' target='__blank'>
                        <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                        <div className='title'>{l(i18n.pages.home.content.realities.ielsg.title)}</div>
                        <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                    </a>
                </div>
            </div>
        );
        const icml = (
            <div className='content'>
                <div className='aside-left'>
                    <div className="image " style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.icml)}')` }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.address) }} />
                </div>
                <div className='aside-right'>
                <img className='article-top-image'  src="https://ucarecdn.com/4a8002af-d818-483c-883c-1a9a084533ad/-/preview//-/resize/800x/" /> 

                    <div className='padded' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
                    <a className={'external-link'} href='http://www.lymphcon.ch/' target='__blank'>
                        <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                        <div className='title'>{l(i18n.pages.home.content.realities.icml.title)}</div>
                        <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                    </a>            
                </div>
            </div>
        );
        const history = (
            <div className='content'>
                
                
                <div className='aside-left'>
                    <div className="image " style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')` }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.fior.address) }} />
                </div>
                <div className='aside-right'>

                <img className='article-top-image' src="/assets/example2.jpg" /> 

                    <div className='padded' dangerouslySetInnerHTML={{ __html: l(i18n.pages.history.content) }} />   
                </div>
            </div>
        )
        const intro = (<div className='placeholder-image' style={{height: 'calc(100vh - 81px)', backgroundImage: "url('http://media.ticinotopten.ch/Castelgrande-30037-full-HD.jpg')"}}>
            <div  style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')`,
                width: 180,
                height: 180,
                backgroundSize: 'cover'}}/>
        </div>);
        if ( ! this.props.location.state ) return intro;
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
                return intro;
        }
        
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        const l = (s) => (s[this.props.language] || s.en);
         //   <div className='breadcrumbs' onClick={this.props.history.goBack}>{'< back'}</div> 
        return (<div className=''>
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