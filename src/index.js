import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {UserProvider} from "./context/user-context/user.context";
import {ItemsProvider} from "./context/items-context/items.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <UserProvider>
              <ItemsProvider>
                  <App />
              </ItemsProvider>
          </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
