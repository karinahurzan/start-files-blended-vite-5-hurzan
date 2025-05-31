import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxState/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
