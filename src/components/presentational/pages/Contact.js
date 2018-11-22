import React from 'react';
import { withRouteData } from 'react-static'

class Contact extends React.Component {

    renderSuccess() {
        return (
            <div>Thanks for your submission!</div>
        )
    }
    render() {
        if(this.props.success) {
            return this.renderSuccess();
        }
        return (
            <form name="contact" method="POST" data-netlify="true" action='/contact/success'>
                <p>
                    <label>Your Name: <input type="text" name="name" /></label>   
                </p>
                <p>
                    <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p>
                    <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form>
        )
    }
}

export default withRouteData(Contact);