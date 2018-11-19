import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from 'domain/state/store';

import { screenResize } from 'domain/state/actions';
import { StripeProvider } from 'react-stripe-elements';
import { window } from 'domain/global';
import App from './App';

class Main extends React.Component {
    
    constructor() {
        super();
        this.state = {stripe: null};
    }

    componentDidMount() {
      if (window.Stripe) {
          this.setState({stripe: window.Stripe('pk_test_12345')});
      } else if (typeof document !== 'undefined') {
          document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({stripe: window.Stripe('pk_test_12345')});
          });
      }
    }

    render() {
        return (
            <StripeProvider apiKey="pk_test_xpM7sZ6yRB83nlEQu6MAI64U" key={this.state.stripe}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StripeProvider>
        )
    }
}

export default Main;

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(
      <StripeProvider apiKey="pk_test_xpM7sZ6yRB83nlEQu6MAI64U">
        <Provider store={store}>
          <Comp />
        </Provider>
      </StripeProvider>
    , document.getElementById('root'))
  }

  // Render!
  render(App)
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    store.dispatch(screenResize(window.innerWidth, window.innerHeight));
  });
  store.dispatch(screenResize(window.innerWidth, window.innerHeight));
}