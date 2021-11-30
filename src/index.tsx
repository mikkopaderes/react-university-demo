import React from 'react';
import ReactDOM from 'react-dom';

import { FirebaseAppProvider } from 'reactfire';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: '123qweasd',
  authDomain: 'react-demo.firebaseapp.com',
  databaseURL: 'https://react-demo.firebaseio.com',
  projectId: 'react-demo',
  storageBucket: 'react-demo.appspot.com',
  messagingSenderId: '123qweasd',
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
