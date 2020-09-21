import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(Component) {
  return ReactDOM.render(
    <React.StrictMode>
      {/* Providers */}
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render(App);

// Enable hot-module-replacement https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
