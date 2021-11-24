import React from "react";
import { Elements } from "react-stripe-elements";
import { injectStripe, CardElement } from "react-stripe-elements";
import i18n from "domain/i18n";
import { Link } from "react-static";
import window from "domain/window";
import config from "config";
// CardSection.js

// import ReactDOM from 'react-dom';
// import paypal from 'paypal-checkout';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 46.194635, lng: 9.022549 }}>
      {props.isMarkerShown && <Marker position={{ lat: 46.194635, lng: 9.022549 }} />}
    </GoogleMap>
  ))
);

// class PayPalButton extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       env: this.props.env,
//       client: {
//         sandbox: this.props.sandboxID,
//         production: this.props.productionID
//       },
//       amount: 100,
//       currency: this.props.currency,
//       commit: this.props.commit
//     };
//   }

//   payment(data, actions) {
//     const payment = actions.payment.create({
//         transactions: [
//             {
//             amount: { total: this.state.amount, currency: this.state.currency }
//             }
//         ]
//     });
//     return payment;
//   }

//   onAuthorize(data, actions) {
//     const execution = actions.payment.execute().then((data)=> this.props.onTransactionSuccessful(this.state.amount, data.payer.payer_info.email));
//     // this.props.onTransactionSuccessful(this.state.amount, this.state.email, 'paypal');
//     return execution;
//   }

//   render() {
//     const PPButton = paypal.Button.driver('react', { React, ReactDOM });
//     return (
//         <div style={{width: '100%'}}>
//         <label className={'stripe-label'}>
//           <input style={styles.StripeElement.base} className={'StripeElement stripe-input stripe-input-amount stripe-input-full'} placeholder={'Donation amount'} type='number' name='amount' value={this.state.amount} onChange={(event)=>this.setState({amount: event.target.value})} />
//           <div className='stripe-currency'>CHF</div></label>
//           <PPButton
//             commit={ this.state.commit }
//             env={ this.state.env }
//             client={ this.state.client }
//             payment={ (data, actions) => this.payment(data, actions) }
//             onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
//             {...this.props}
//             locale={'en_US'}
//             style={{
//                 color: 'blue',
//                 shape: 'rect',
//                 size: 'responsive',
//                 label: 'pay',
//                 tagline: false,
//                 layout: 'horizontal',
//                 fundingicons: 'true',
//             }}
//         />

//       </div>
//     );
//   }
// }

class CardSection extends React.Component {
  render() {
    return (
      <label>
        <CardElement style={styles.StripeElement} />
      </label>
    );
  }
}

class CheckoutForm extends React.Component {
  handleSubmit = ev => {
    const l = s => s[this.props.language];
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    const _props = this.props;
    const _state = this.state;

    this.setState({ initiated: true });
    const that = this;
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    _props.stripe
      .createToken({
        name: this.state.name,
        email: this.state.email,
        //   amount: this.state.amount * 100,
        //   receipt_email: this.state.email,
        //   description: 'Donation to IOR',
        address_line1: this.state.address_line1,
        address_city: this.state.address_city,
        address_country: this.state.address_country
      })
      .then(({ token }) => {
        if (!token) {
          _props.onTransactionFailed(_state.amount, _state.email);
          that.setState({ initiated: false });
          return;
        }
        // console.log('Received Stripe token:', token);
        _props.onDonate(this.state.amount, l(i18n.modal.descriptions.onDonate));
        // _props.onTransactionStart(this.state.amount);
        fetch("https://us-central1-ior-web.cloudfunctions.net/charge/donations/charge", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            tokenId: token.id,
            name: this.state.name,
            email: this.state.email,
            amount: this.state.amount * 100,
            address_line1: this.state.address_line1,
            address_city: this.state.address_city,
            address_country: this.state.address_country
          })
        })
          .catch(() => {
            that.setState({ initiated: false });
            _props.onTransactionFailed(_state.amount, _state.email);
          })
          .then(response => response.json())
          .then(() => {
            that.setState({ initiated: false, done: true });
            _props.onTransactionSuccessful(_state.amount, _state.email);
            // console.log(JSON.stringify(transaction));
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
    email: "",
    name: "",
    address_line1: "",
    address_city: "",
    address_country: "",
    initiated: false,
    done: false
  };

  render() {
    const l = s => s[this.props.language] || s.en;
    if (this.state.done) {
      return <div className="thanks-credit-card">{l(i18n.pages.donations.creditCard.thanks)}</div>;
    }
    return (
      <form onSubmit={this.handleSubmit} style={{ width: "100%", opacity: this.state.initiated ? 0.5 : 1 }}>
        {/* <AddressSection /> */}
        <label className={"stripe-label"}>
          <input
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-amount stripe-input-full"}
            placeholder={l(i18n.pages.donations.creditCard.placeholders.amount)}
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <div className="stripe-currency">CHF</div>
        </label>
        <label className={"stripe-label"}>
          <input
            placeholder={l(i18n.pages.donations.creditCard.placeholders.email)}
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-full"}
            type="email"
            name="email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
        </label>
        <label className={"stripe-label"}>
          <input
            placeholder={l(i18n.pages.donations.creditCard.placeholders.address_line1)}
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-full"}
            type="text"
            name="address_line1"
            value={this.state.address_line1}
            onChange={event => this.setState({ address_line1: event.target.value })}
          />
        </label>
        <label className={"stripe-label"}>
          <input
            placeholder={l(i18n.pages.donations.creditCard.placeholders.address_city)}
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-full"}
            type="text"
            name="address_city"
            value={this.state.address_city}
            onChange={event => this.setState({ address_city: event.target.value })}
          />
        </label>
        <label className={"stripe-label"}>
          <input
            placeholder={l(i18n.pages.donations.creditCard.placeholders.address_country)}
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-full"}
            type="text"
            name="address_country"
            value={this.state.address_country}
            onChange={event => this.setState({ address_country: event.target.value })}
          />
        </label>
        <label className={"stripe-label"}>
          <input
            placeholder={l(i18n.pages.donations.creditCard.placeholders.nameOnCard)}
            style={styles.StripeElement.base}
            className={"StripeElement stripe-input stripe-input-full"}
            type="text"
            name="name"
            value={this.state.name.toUpperCase()}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </label>
        <CardSection />
        <button className={"stripe-button"}>{l(i18n.pages.donations.creditCard.confirmOrder)}</button>
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

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.cleanAnimations = this.cleanAnimations.bind(this);
    this.setupAnimations = this.setupAnimations.bind(this);
  }

  componentDidMount() {
    this.setupAnimations();
    window.addEventListener("resize", () => {
      this.cleanAnimations();
      this.setupAnimations();
    });
  }

  componentWillUnmount() {
    this.cleanAnimations();
  }

  setupAnimations() {
    if (window) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  cleanAnimations() {
    if (window) {
      if (this.address) {
        const l = this.address;
        l.style.position = "relative";
        l.style.top = "0px";
      }
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll() {
    if (window.innerWidth > 1063) {
      const navHeight = 101;
      if (this.address) {
        const l = this.address;
        if (navHeight + 20 + l.clientHeight >= l.parentElement.parentElement.getBoundingClientRect().bottom - 320) {
          l.style.position = "absolute";
          l.style.bottom = "320px";
          l.style.top = null;
        } else if (l.parentElement.getBoundingClientRect().top > navHeight + 20) {
          l.style.position = "relative";
          l.style.top = "0px";
        } else if (l.parentElement.getBoundingClientRect().top <= navHeight + 20) {
          l.style.position = "fixed";
          l.style.top = `${navHeight + 20}px`;
          l.style.bottom = null;
        } else {
          l.style.position = "fixed";
          l.style.top = `${navHeight + 20}px`;
          l.style.bottom = null;
        }
      }
    }
  }

  renderLeft() {
    const l = s => s[this.props.language] || s.en;
    return (
      <div>
        <div className="padded">
          <div className="bubble" dangerouslySetInnerHTML={{ __html: l(i18n.pages.donations.intro) }} />
        </div>
        <div className="donations">
          <Link to={{ pathname: "/donations", state: { method: "credit-card", slave: true } }} href="/donations">
            <div
              className={`donation-list-item ${
                this.props.location.state && this.props.location.state.method === "credit-card" ? "selected" : ""
              }`}
            >
              <div>{l(i18n.pages.donations.creditCard.title)}</div>
              <img className="arrow-right" src="/assets/arrow-right.png" alt="select" />
            </div>
          </Link>
          {/* <Link to={{pathname: '/donations', state: { method: 'paypal', slave: true}}} href='/donations'>
                        <div className={`donation-list-item ${this.props.location.state && this.props.location.state.method === 'paypal' ? 'selected' : ''}`}>
                            <div>{l(i18n.pages.donations.payPal.title)}</div>
                            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                        </div>
                    </Link> */}
          <Link to={{ pathname: "/donations", state: { method: "bank-transfer", slave: true } }} href="/donations">
            <div
              className={`donation-list-item ${
                this.props.location.state && this.props.location.state.method === "bank-transfer" ? "selected" : ""
              }`}
            >
              <div>{l(i18n.pages.donations.bankTransfer.title)}</div>
              <img className="arrow-right" src="/assets/arrow-right.png" alt="select" />
            </div>
          </Link>
          <Link to={{ pathname: "/donations", state: { method: "post-office-account", slave: true } }} href="/donations">
            <div
              className={`donation-list-item ${
                this.props.location.state && this.props.location.state.method === "post-office-account" ? "selected" : ""
              }`}
            >
              <div>{l(i18n.pages.donations.post.title)}</div>
              <img className="arrow-right" src="/assets/arrow-right.png" alt="select" />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  renderCreditCardForm() {
    const l = s => s[this.props.language] || s.en;
    return (
      <div className="credit-card-form">
        <div style={{ marginTop: 0 }} className="row-size-text">
          <span>{l(i18n.pages.donations.creditCard.title)}</span>
        </div>
        <Elements locale={this.props.language}>
          <InjectedCheckoutForm {...this.props} />
        </Elements>
      </div>
    );
  }

  // renderPaypalForm() {
  //     const l = (s) => (s[this.props.language] || s.en);
  //     return (
  //         <div className='paypal-form'>
  //             <div className='row-size-text'>{l(i18n.pages.donations.payPal.title)}</div>
  //             <PayPalButton
  //                 onTransactionSuccessful={this.props.onTransactionSuccessful}
  //                 env='sandbox'
  //                 sandboxID='AaTUAdq41QA5Yjlf9OIq-zF_wLzlacj6WGR611rHtuzl79SPSYXDQQw-d5la_0_uYTVhuueBORehUjtx'
  //                 currency='CHF'
  //                 commit
  //             />
  //         </div>
  //     )
  // }

  renderBankTransferForm() {
    const l = s => s[this.props.language] || s.en;
    return (
      <div>
        <div className="row-size-text">
          <span>{l(i18n.pages.donations.bankTransfer.title)}</span>
        </div>
        <div
          className="transfer-description"
          dangerouslySetInnerHTML={{ __html: l(i18n.pages.donations.bankTransfer.description) }}
        />
      </div>
    );
  }

  renderPostOfficeAccountForm() {
    const l = s => s[this.props.language] || s.en;
    return (
      <div>
        <div className="row-size-text">
          <span>{l(i18n.pages.donations.post.title)}</span>
        </div>
        <div
          className="transfer-description"
          dangerouslySetInnerHTML={{ __html: l(i18n.pages.donations.post.description) }}
        />
      </div>
    );
  }

  // componentDidUpdate() {
  //     if(document.getElementById('current') !== null) {
  //         window.requestAnimationFrame(()=>{
  //             window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
  //         })
  //     }
  // }

  render() {
    const l = s => s[this.props.language] || s.en;
    if (this.props.side === "left") {
      return this.renderLeft();
    }
    // console.log(this.props.location.state)
    //       <div className='breadcrumbs' onClick={this.props.history.goBack}>{'< back'}</div>
    // if ((!this.props.location.state || ! this.props.location.state.slave) && window.innerWidth > 1300) return (
    //     <div className='placeholder-image' style={ { backgroundImage: 'url(\'https://goalde.files.wordpress.com/2013/04/gerber-mark-handspic.jpg\')'}} />
    // );
    return (
      <div className="page">
        {this.props.current && <div id="current">current</div>}
        <div className="row-size-text">
          <span>{l(i18n.pages.donations.title)}</span>
        </div>

        {this.props.location.state && this.props.location.state.slave && (
          <div className="breadcrumbs" onClick={this.props.history.goBack}>
            <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
            <div className="go-back">{l(i18n.navigation.back)}</div>
          </div>
        )}
        <div className="content">
          <div className="aside-left">
            <div className="contact-address" ref={el => (this.address = el)}>
              <div
                className="image "
                style={{ marginTop: 0, backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')` }}
              />
              <div className="description" dangerouslySetInnerHTML={{ __html: l(i18n.pages.contact.address) }} />
              {/* <br/>
              <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.contact.communication) }} /> */}

            </div>
          </div>
          <div style={{ flex: 1 }} className="aside-center">
            {/* {(()=>{
                            switch(this.props.location.state && this.props.location.state.method) {
                                case 'credit-card':
                                    return this.renderCreditCardForm();
                                case 'paypal':
                                    return this.renderPaypalForm();
                                case 'bank-transfer':
                                    return this.renderBankTransferForm();
                                case 'post-office-account':
                                    return this.renderPostOfficeAccountForm();
                                default: 
                                    return this.renderCreditCardForm();
                            }
                        })()} */}
            <div className="payment-methods" style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                {this.renderBankTransferForm()}
                {/* { this.renderPaypalForm() } */}
                {this.renderPostOfficeAccountForm()}
              </div>
              <div style={{ flex: 1, marginLeft: window.innerWidth > 1023 ? 20 : 0 }}>{this.renderCreditCardForm()}</div>
            </div>

            {/* <div className='payment-methods' >
                        { this.renderCreditCardForm() }
                        </div> */}
            <div style={{ flex: 1 }}>
              <div style={{ marginRight: 0 }} className="row-size-text">
                <span>{l(i18n.pages.contact.title)}</span>
              </div>
              <form
                id="contact-form"
                className=""
                name="contact"
                method="POST"
                data-netlify="true"
                action="/contact/success"
              >
                <input key="hidden" type="hidden" name="form-name" value="contact" />
                <div key="field-0" className="field">
                  <label>
                    {l(i18n.pages.contact.labels.name)}:{" "}
                    <input placeholder={l(i18n.pages.contact.placeholders.name)} type="text" name="name" />
                  </label>
                </div>
                <div key="field-1" className="field">
                  <label>
                    {l(i18n.pages.contact.labels.email)}:{" "}
                    <input placeholder={l(i18n.pages.contact.placeholders.email)} type="email" name="email" />
                  </label>
                </div>
                <div key="field-2" className="field">
                  <label>
                    {l(i18n.pages.contact.labels.message)}:{" "}
                    <textarea placeholder={l(i18n.pages.contact.placeholders.message)} name="message" />
                  </label>
                </div>
                <div key="field-3" className="field">
                  <button className="submit" type="submit">
                    {l(i18n.pages.contact.send)}
                  </button>
                </div>
              </form>
            </div>
            <div className="map-container">
              <MyMapComponent
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                  config.googleMapsKey
                }&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div className="map-element" />}
                containerElement={<div className="map-element" />}
                mapElement={<div className="map-element" />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  StripeElement: {
    base: {
      color: "#32325d",
      lineHeight: "18px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};
