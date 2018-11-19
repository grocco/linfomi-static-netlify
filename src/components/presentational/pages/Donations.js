import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import {injectStripe, CardElement} from 'react-stripe-elements';
import i18n from 'domain/i18n';
// CardSection.js

import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { Row, Col } from 'react-grid-system';

class PayPalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      env: this.props.env,
      client: {
        sandbox: this.props.sandboxID,
        production: this.props.productionID
      },
      amount: 100,
      currency: this.props.currency,
      commit: this.props.commit
    };
  }

  payment(data, actions) {
    return actions.payment.create({
      transactions: [
        {
          amount: { total: this.state.amount, currency: this.state.currency }
        }
      ]
    });
  }

  onAuthorize(data, actions) {
    return actions.payment.execute();
  }

  render() {
    const PPButton = paypal.Button.driver('react', { React, ReactDOM });
    return (
        <div style={{width: '100%'}}>
        <label className={'stripe-label'}>
          <input style={styles.StripeElement.base} className={'StripeElement stripe-input stripe-input-amount stripe-input-full'} placeholder={'Donation amount'} type='number' name='amount' value={this.state.amount} onChange={(event)=>this.setState({amount: event.target.value})} />
          <div className='stripe-currency'>CHF</div></label>
          <PPButton
            commit={ this.state.commit }
            env={ this.state.env }
            client={ this.state.client }
            payment={ (data, actions) => this.payment(data, actions) }
            onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
            {...this.props}
            locale={'en_US'}
            style={{
                color: 'blue',
                shape: 'rect',
                size: 'responsive',
                label: 'pay',
                tagline: false,
                layout: 'horizontal',
                fundingicons: 'true',
            }}
        />

      </div>
    );
  }
}


class CardSection extends React.Component {
  render() {
    return (
      <label>
        <CardElement 
            style={styles.StripeElement}
        />
      </label>
    );
  }
}


class CheckoutForm extends React.Component {
    handleSubmit = (ev) => {
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();

      const _props = this.props;
      const _state = this.state;
  
      _props.onDonate(this.state.amount);
      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      _props.stripe.createToken({name: this.state.name, email: this.state.email, amount: this.state.amount * 100}).then(({token}) => {
        console.log('Received Stripe token:', token);
        _props.onTransactionStart(this.state.amount);
        fetch('https://us-central1-ior-web.cloudfunctions.net/charge/donations/charge', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                tokenId: token.id,
                name: this.state.name,
                email: this.state.email,
                amount: this.state.amount * 100
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(transaction) {
            _props.onTransactionSuccessful(_state.amount, _state.email)
            console.log(JSON.stringify(transaction));
        });
      });
  
      // However, this line of code will do the same thing:
      //
      // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  
      // You can also use createSource to create Sources. See our Sources
      // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
      //
      // this.props.stripe.createSource({type: 'card', owner: {
      //   name: 'Jenny Rosen'
      // }});
    };

    state = {
        amount: 100,
        email: '',
        name: ''
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
          {/* <AddressSection /> */}
          <label className={'stripe-label'}>
          <input style={styles.StripeElement.base} className={'StripeElement stripe-input stripe-input-amount stripe-input-full'} placeholder={'Donation amount'} type='number' name='amount' value={this.state.amount} onChange={(event)=>this.setState({amount: event.target.value})} />
          <div className='stripe-currency'>CHF</div></label>
          <label className={'stripe-label'}>
          <input placeholder={'E-mail address'} style={styles.StripeElement.base} className={'StripeElement stripe-input stripe-input-full'} type='email' name='email' value={this.state.email} onChange={(event)=>this.setState({email: event.target.value})} />
          </label>
          <label className={'stripe-label'}>
          <input placeholder={'Name on the card'} style={styles.StripeElement.base} className={'StripeElement stripe-input stripe-input-full'} type='text' name='name' value={this.state.name.toUpperCase()} onChange={(event)=>this.setState({name: event.target.value})} />
          </label>
          <CardSection />
          <button className={'stripe-button'}>Confirm order</button>
        </form>
      );
    }
  }
  
 const InjectedCheckoutForm = injectStripe(CheckoutForm);


export default class Donations extends React.PureComponent {

    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    render() {
        return (
            <div>
                <h2>{i18n.pages.donations.title[this.props.language]}</h2>
                <p>{i18n.pages.donations.subtitle[this.props.language]}</p>
                    <Row>
                        <Col sm={6} lg={this.props.windowInnerWidth > 1200 ? 4 : 6} >
                            <h2>{i18n.pages.donations.creditCard.title[this.props.language]}</h2>
                            <Elements locale={this.props.language}>
                                <InjectedCheckoutForm 
                                    {...this.props}
                                />
                            </Elements>
                        </Col>
                        <Col sm={6} lg={this.props.windowInnerWidth > 1200 ? 4 : 6} >
                            <h2>{i18n.pages.donations.payPal.title[this.props.language]}</h2>
                            <PayPalButton
                                env='sandbox'
                                sandboxID='AaTUAdq41QA5Yjlf9OIq-zF_wLzlacj6WGR611rHtuzl79SPSYXDQQw-d5la_0_uYTVhuueBORehUjtx'
                                currency='CHF'
                                commit={true}
                            />
                        </Col>
                        <Col sm={6} lg={this.props.windowInnerWidth > 1200 ? 4 : 6} >
                            <h2>{i18n.pages.donations.bankTransfer.title[this.props.language]}</h2>
                            <p dangerouslySetInnerHTML={{ __html: i18n.pages.donations.bankTransfer.description[this.props.language] }} />
                        </Col>
                        <Col sm={6} lg={this.props.windowInnerWidth > 1200 ? 4 : 6} >
                            <h2>{i18n.pages.donations.post.title[this.props.language]}</h2>
                            <p dangerouslySetInnerHTML={{ __html: i18n.pages.donations.post.description[this.props.language] }} />
                        </Col>
                    </Row>
            </div>
        )
    }

}

const styles = {
    StripeElement: {
        base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
}