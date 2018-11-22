import React, { Component } from 'react';
import i18n from 'domain/i18n';
import { Link } from 'react-static';

export default class Home extends Component {

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        return (
            <div className='page-home'>
                <div className='card-title' >
                    <h1 className='card-h2'>{l(i18n.pages.home.content.realities.fior.acronym)}</h1>
                    <h3 className='card-h3'>{l(i18n.pages.home.content.realities.fior.title)}</h3>
                </div>
                <p>{l(i18n.pages.home.content.thanks)}</p>
                <p>{l(i18n.pages.home.content.realities.introduction)}</p>
                <ol>
                    <li><Link to={{pathname:'/home/', state: { reality: 'ior'}}} href='/home'>{l(i18n.pages.home.content.realities.ior.title)}</Link></li>
                    <li><Link to={{pathname:'/home/', state: { reality: 'ielsg'}}} href='/home'>{l(i18n.pages.home.content.realities.ielsg.title)}</Link></li>
                    <li><Link to={{pathname:'/home/', state: { reality: 'icml'}}} href='/home'>{l(i18n.pages.home.content.realities.icml.title)}</Link></li>
                </ol>
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
                <Link to={{pathname:'/president'}} href='/president'>
                    <p>{l(i18n.pages.home.content.signature.name)}
                        <br/>
                        {l(i18n.pages.home.content.signature.description)}
                    </p>
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
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
            </div>
        );
        const ielsg = (
            <div>
                <img className='card-img-wrap-left' width='100' src='/assets/ielsg.jpg' alt='ielsg logo'/>
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
            </div>
        );
        const icml = (
            <div>
                <img className='card-img-wrap-left' width='100' src='/assets/icml_logo.png' alt='icml logo'/>
                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
            </div>
        );
        if ( ! this.props.location.state ) return ior;
        switch( this.props.location.state.reality) {
            case 'ior':
                return ior;
            case 'ielsg':
                return ielsg;
            case 'icml':
                return icml;
            default:
                return ior;
        }

        // return (
        //     <div>
        //         <div>
        //             {/* <div className={'card-title'} >
        //                 <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.ior.acronym)}</h1>
        //                 <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.ior.title)}</h3>
        //             </div> */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100%'} src={'/assets/IOR_logo.gif'} />
        //                 <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
        //             </div>
        //         </div>
        //         <div >
        //             {/* <div className={'card-title'} >
        //                 <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.ielsg.acronym)}</h1>
        //                 <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.ielsg.title)}</h3>
        //             </div>                             */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100'} src={'/assets/ielsg.jpg'} />
        //                 <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
        //             </div>
        //         </div>
        //         <div>
        //             {/* <div className={'card-title'} >
        //                 <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.icml.acronym)}</h1>
        //                 <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.icml.title)}</h3>
        //             </div>                             */}
        //             <div>
        //                 <img className={'card-img-wrap-left'} width={'100'} src={'/assets/icml_logo.png'} />
        //                 <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
        //             </div>
        //         </div>
        //     </div>
        // )
        
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        return this.renderRight();
    }

}