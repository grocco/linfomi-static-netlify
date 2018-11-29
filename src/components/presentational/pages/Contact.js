import React from 'react';
import { withRouteData, Link } from 'react-static'
import i18n from 'domain/i18n';


class Contact extends React.Component {

    renderSuccess() {
        const l = (s) => (s[this.props.language] || s.en);
        if (this.props.side === 'left') return <div className='padded'><div className='bubble'>{l(i18n.pages.contact.thanks)}</div></div>;
        return (
            <div className='padded'><div className='bubble'>{l(i18n.pages.contact.backToYou)}</div></div>
        )
    }

    renderLeft() {
        const l = (s) => (s[this.props.language] || s.en);
        if(this.props.success) {
            return null;
        }
        return (
            <div className='padded'>
                <div className='bubble'>{l(i18n.pages.contact.pleaseFill)}</div>
                <br/>
                <div className='list-items'>
                    <Link to={{pathname: '/contact', state: { slave: true }}} href='/council'>
                        <div className='list-item'>
                            <div>{l(i18n.pages.contact.form)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>  
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        const l = (s) => (s[this.props.language] || s.en);
        if(this.props.success) {
            return this.renderSuccess();
        }
        if (this.props.side === 'left') return this.renderLeft();
        return (
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
        )
    }
}

export default withRouteData(Contact);