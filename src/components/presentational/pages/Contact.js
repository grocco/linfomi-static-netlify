import React from 'react';
import { withRouteData } from 'react-static'
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
            <div>Please complete the form to contact us.</div>
        )
    }

    render() {
        if(this.props.success) {
            return this.renderSuccess();
        }
        if (this.props.side === 'left') return this.renderLeft();
        return (
            <form name="contact" method="POST" data-netlify="true" action='/contact/success'>
                <input type="hidden" name="form-name" value="contact" />
                <div>
                    <label>Your Name: <input type="text" name="name" /></label>   
                </div >
                <div>
                    <label>Your Email: <input type="email" name="email" /></label>
                </div >
                <div>
                    <label>Message: <textarea name="message"></textarea></label>
                </div >
                <div>
                    <button type="submit">Send</button>
                </div >
            </form>
        )
    }
}

export default withRouteData(Contact);