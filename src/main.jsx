import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './store/themeSlice.js';
import dataReducer from './store/dataSlice.js' 
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    data:dataReducer
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
)
