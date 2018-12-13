import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from 'domain/state/store';
import { screenResize } from 'domain/state/actions';
import window from 'domain/window';
import App from './App';

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Main;


// if (typeof window !== 'undefined') {
//   const StripeProvider = require('react-stripe-elements').StripeProvider;

//   const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
//   const render = Comp => {
//     renderMethod(
//       <StripeProvider apiKey="pk_test_xpM7sZ6yRB83nlEQu6MAI64U">
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

// Render your app
if (typeof document !== 'undefined') {

  const StripeProvider = require('react-stripe-elements').StripeProvider;
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

  // window.addEventListener('resize', () => {
  //   store.dispatch(screenResize(window.innerWidth, window.innerHeight));
  // });
 store.dispatch(screenResize(window.innerWidth, window.innerHeight));

}