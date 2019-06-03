import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from 'domain/state/store';
import { screenResize } from 'domain/state/actions';
import window from 'domain/window';
import config from './config';

const App = config.version === 2 ? require('./App2').default : require('./App').default ;


class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children || <App />}
      </Provider>
    )
  }
}

const pk = 'pk_test_jkNc2tU1W0U8ssVMw0myhPnA00PajLTKwz' // 'pk_live_oBxXZPfdCmST9slFK1SSRiJs00Trm1agMS'

if (typeof document !== 'undefined') {
  const StripeProvider = require('react-stripe-elements').StripeProvider;

  class MMain extends React.Component {
    constructor() {
      super();
      this.state = {stripe: null};
    }
    componentDidMount() {
      if (!window.server && window.Stripe) {
        this.setState({stripe: window.Stripe(pk)});
      } else {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({stripe: !window.server && window.Stripe(pk)});
        });
      }
    }
    render() {
      return (
        <StripeProvider stripe={this.state.stripe}>
          <Main>{this.props.children}</Main>
        </StripeProvider>
      )
    }
  }

  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
      renderMethod((<MMain><Comp /></MMain>), document.getElementById('root'))
  }

  // Render!
  render(App)

  // window.addEventListener('resize', () => {
  //   store.dispatch(screenResize(window.innerWidth, window.innerHeight));
  // });
 store.dispatch(screenResize(window.innerWidth, window.innerHeight));

}

export default Main;


// if (typeof window !== 'undefined') {
//   const StripeProvider = require('react-stripe-elements').StripeProvider;

//   const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
//   const render = Comp => {
//     renderMethod(
//       <StripeProvider apiKey="pk_live_oBxXZPfdCmST9slFK1SSRiJs00Trm1agMS">
//         <Provider store={store}>
//           <Comp />
//         </Provider>
//       </StripeProvider>
//     , document.getElementById('root'))
//   }

//   // Render!
//   render(App)

//   window.addEventListener('resize', () => {
//     store.dispatch(screenResize(window.innerWidth, window.innerHeight));
//   });
//   store.dispatch(screenResize(window.innerWidth, window.innerHeight));
// } else {

