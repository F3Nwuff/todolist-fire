import React from 'react'
import ReactDOM from 'react-dom/client'
import Lognote from './lognote.jsx'
import App from './App.jsx'
import Login from './components/auth/login'
import Register from './components/auth/register'
import './css/global.css'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Lognote />
  </BrowserRouter>
);

