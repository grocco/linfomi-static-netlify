import React, { Component } from 'react';
import i18n from 'domain/i18n';
import { Link } from 'react-static';

export default class Intro extends Component {

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        return <div style={{height: 'calc(100vh - 0px)', }}>

        <div className='page-home padded'>
                {/* <Link to={{pathname:'/home/', state: { reality: 'history'}}} href='/home'>
                    <div >
                        <div >{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                        <div >{l(i18n.pages.home.content.realities.fior.title)}</div>
                    </div>
                </Link> */}
                
                <div className='home-intro' >
                    <Link to={{pathname:'/council', state: { memberSlug: 'president', slave: true}}} href='/president'>
                        <div id='president-pic' style={{backgroundImage: `url('/assets/president.jpg')`}}/>
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
    </div>
    }

    renderRight() {
        const l = (s) => (s[this.props.language] || s.en);

        return <div className='placeholder-image' style={{height: 'calc(100vh - 0px)', backgroundImage: "url('http://media.ticinotopten.ch/Castelgrande-30037-full-HD.jpg')"}}>
             {/* http://www.linuxcmd.org/lcshow/big/0/451_red-wallpaper.png */}

                        <div  style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')`,
                        width: 180,
    height: 180,
    backgroundSize: 'cover'}}/>




        </div>
        
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        return this.renderRight();
    }

}