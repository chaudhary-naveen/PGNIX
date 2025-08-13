import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import HomePage from './HomePage/HomePage.jsx'


import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import appStore from "./utils/reduxStore";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
let persistor = persistStore(appStore);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
    <Provider store={appStore}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)

