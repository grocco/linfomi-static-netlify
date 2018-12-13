import React from 'react';
import { withRouteData, Link } from 'react-static'
import i18n from 'domain/i18n';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import window from 'domain/window';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 46.194635, lng: 9.022549 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 46.194635, lng: 9.022549 }} />}
  </GoogleMap>
));


class Contact extends React.Component {

    renderSuccess() {
        const l = (s) => (s[this.props.language] || s.en);
        return <div className='padded'>
            <div className="breadcrumbs" onClick={()=>this.props.history.push('/home')}>
                <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
                <div className='go-back'>{l(i18n.navigation.back)}</div>
            </div>
            <div className='bubble'>{l(i18n.pages.contact.thanks)}<br/><br/>{l(i18n.pages.contact.backToYou)}</div>
        </div>;
    }

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        return (
            <div className='padded' style={{paddingTop: 0}}>
                {/* <div className='bubble'>{l(i18n.pages.contact.pleaseFill)}</div> */}
                {/* <br/> */}
                <div className='list-items'>
                    <Link key='form' to={{pathname: '/contact', state: { slave: 'details' }}} href='/contact/details'>
                        <div className='list-item'>
                            <div>{l(i18n.pages.contact.detailsItem)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>  
                    </Link>
                    {/* <Link key='form' to={{pathname: '/contact', state: { slave: 'form' }}} href='/contact/form'>
                        <div className='list-item'>
                            <div>{l(i18n.pages.contact.form)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>  
                    </Link> */}
                    <Link key='map' to={{pathname: '/contact', state: { slave: 'map' }}} href='/contact/map'>
                        <div className='list-item'>
                            <div>{l(i18n.pages.contact.map)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>  
                    </Link>
                </div>
            </div>
        )
    }

    renderRight() {
        const l = (s) => (s[this.props.language] || s.en);
        if ((!this.props.history.location.state || ! this.props.history.location.state.slave) && window.innerWidth > 1300) return (
            <div className='placeholder-image' style={ { backgroundImage: 'url(\'https://www.savoylimerick.com/cmsGallery/imagerow/11811/resized/1500x800/office_people_brochure.jpg\')'}} />
        );
        const form = (
            <div style={{flex: 1}}>
                <form id='contact-form' className='padded' name="contact" method="POST" data-netlify="true" action='/contact/success'>
                    <input key='hidden' type="hidden" name="form-name" value="contact" />
                    <div key='field-0' className='field'>
                        <label>{l(i18n.pages.contact.labels.name)}: <input placeholder={l(i18n.pages.contact.placeholders.name)} type="text" name="name" /></label>   
                    </div >
                    <div key='field-1' className='field'>
                        <label>{l(i18n.pages.contact.labels.email)}: <input placeholder={l(i18n.pages.contact.placeholders.email)}  type="email" name="email" /></label>
                    </div >
                    <div key='field-2' className='field'>
                        <label>{l(i18n.pages.contact.labels.message)}: <textarea placeholder={l(i18n.pages.contact.placeholders.message)}  name="message" /></label>
                    </div >
                    <div key='field-3' className='field'>
                        <button className='submit' type="submit">{l(i18n.pages.contact.send)}</button>
                    </div >
                </form>
            </div>
        );
        const map = (
            <div  className='map-container'>
                <MyMapComponent 
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-7QaZ0BVi7guiWSBodnHCDr5LT4NoFtk&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div className='map-element' />}
                    containerElement={<div className='map-element' />}
                    mapElement={<div className='map-element' />}
                 />
            </div>
        );
        const details = (
            <div style={{flex: 1}}>
                <div className='padded' dangerouslySetInnerHTML={{ __html: l(i18n.pages.contact.details) }} />
            </div>
        )
        if( this.props.history.location.state && this.props.history.location.state.slave === 'map') {
            return (
                <div className='content'>
                    <div className='aside-left aside-map'>
                        <div className="image " style={{backgroundImage: "url('/assets/fondazione_ior.png')" }} />
                        <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.contact.address) }} />
                    </div>
                    <div style={{position:'relative', width: '100%', flex: 1}}>     
                        {map}
                    </div>
                </div>
            )
        } 
        return (
            <div className='content'>
                <div className='aside-left'>
                    <div className="image " style={{backgroundImage: "url('/assets/fondazione_ior.png')" }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.contact.address) }} />
                </div>
                {details}
            </div>
        );
    }

    render() {
        const l = (s) => (s[this.props.language] || s.en);
        if (this.props.side === 'left') return this.renderLeft();
        if(this.props.success) {
            return this.renderSuccess();
        }
        return (<div className=''>
            { this.props.history.location.state && this.props.history.location.state.slave && 
                <div className="breadcrumbs" onClick={this.props.history.goBack}>
                    <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
                    <div className='go-back'>{l(i18n.navigation.back)}</div>
                </div>
            }
            {this.renderRight()}
        </div>);
    }
}

export default withRouteData(Contact);