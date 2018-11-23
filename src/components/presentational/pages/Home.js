import React, { Component } from 'react';
import i18n from 'domain/i18n';
import { Link } from 'react-static';

export default class Home extends Component {

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        return (
            <div className='page-home padded'>
                <Link to={{pathname:'/home/', state: { reality: 'history'}}} href='/home'>
                    <div >
                        <div >{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                        <div >{l(i18n.pages.home.content.realities.fior.title)}</div>
                    </div>
                </Link>
                <div>{l(i18n.pages.home.content.thanks)}</div >
                <div>{l(i18n.pages.home.content.realities.introduction)}</div >
                <ol>
                    <li><Link to={{pathname:'/home/', state: { reality: 'ior'}}} href='/home'>{l(i18n.pages.home.content.realities.ior.title)}</Link></li>
                    <li><Link to={{pathname:'/home/', state: { reality: 'ielsg'}}} href='/home'>{l(i18n.pages.home.content.realities.ielsg.title)}</Link></li>
                    <li><Link to={{pathname:'/home/', state: { reality: 'icml'}}} href='/home'>{l(i18n.pages.home.content.realities.icml.title)}</Link></li>
                </ol>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
                <br/>
                <Link to={{pathname:'/president'}} href='/president'>
                    <div className='round' id='president-pic' style={{backgroundImage: `url('/assets/president.jpg')`}}/>
                    <div>{l(i18n.pages.home.content.signature.name)}
                        <br/>
                        {l(i18n.pages.home.content.signature.description)}
                    </div >
                </Link>
            </div>
        )
    }

    
    renderRight() {
        console.log(this.props)
        const l = (s) => (s[this.props.language] || s.en);
        const ior = (
            <div>
                <img className='card-img-wrap-left' width='100' src='/assets/IOR_logo.gif' alt='ior logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
            </div>
        );
        const ielsg = (
            <div>
                <img className='card-img-wrap-left' width='100' src='/assets/ielsg.jpg' alt='ielsg logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
            </div>
        );
        const icml = (
            <div>
                <img className='card-img-wrap-left' width='100' src='/assets/icml_logo.png' alt='icml logo'/>
                <div dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
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
        return <div className='padded'>{this.renderRight()}</div>;
    }

}