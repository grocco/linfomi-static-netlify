import React from 'react';
import { withRouteData, Link } from 'react-static'
import { isNull } from 'util';

class Contact extends React.Component {

    renderSuccess() {
        if (this.props.side === 'left') return <div>Thanks for your submission!</div>;

        return (
            <div>We will reply shortly.</div>
        )
    }

    renderLeft() {
        if(this.props.success) {
            return null;
        }
        return (
            <div className='padded'>
                <div className='bubble'>Please complete the form to contact us.</div>
                <br/>
                <div className='list-items'>
                    <Link to={{pathname: '/contact', state: { slave: true }}} href='/council'>
                        <div className='list-item'>
                            <div>Contact</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>  
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        if(this.props.success) {
            return this.renderSuccess();
        }
        if (this.props.side === 'left') return this.renderLeft();
        return (
            <form id='contact-form' className='padded' name="contact" method="POST" data-netlify="true" action='/contact/success'>
                <input key='hidden' type="hidden" name="form-name" value="contact" />
                <div key='field-0' className='field'>
                    <label>Name: <input placeholder='Your name' type="text" name="name" /></label>   
                </div >
                <div key='field-1' className='field'>
                    <label>E-mail: <input placeholder='you@example.com'  type="email" name="email" /></label>
                </div >
                <div key='field-2' className='field'>
                    <label>Message: <textarea placeholder='Your message ...'  name="message"></textarea></label>
                </div >
                <div key='field-3' className='field'>
                    <button className='submit' type="submit">Send</button>
                </div >
            </form>
        )
    }
}

export default withRouteData(Contact);