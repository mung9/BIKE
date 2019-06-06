import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App.jsx";

import { Provider } from "react-redux";

import './components/commons/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Login from "./components/Login/Login";

import store from "./store";

const root = document.getElementById("root");

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  root
);
