import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {UserProvider} from "./context/user-context/user.context";
import {ItemsProvider} from "./context/items-context/items.context";
import {CartDropdownSwitchProvider} from "./context/cart-dropdown-switch/cart-dropdown-switch.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <UserProvider>
              <ItemsProvider>
                  <CartDropdownSwitchProvider>
                      <App />
                  </CartDropdownSwitchProvider>
              </ItemsProvider>
          </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
