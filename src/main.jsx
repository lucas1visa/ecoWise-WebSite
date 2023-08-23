import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css';
import store from './redux/store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
