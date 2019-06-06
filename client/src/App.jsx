import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "babel-polyfill";

import "./main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import Login from "./components/Login/Login";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer";

import Main from "./components/Main/Main";
import Rent from "./components/Rent/Rent";

import { reqGetRentalSpots } from "./actions/rentalSpotsActions";
import { reqGetUser } from "./actions/userActions";
import { getAuth } from "./auth/auth";
import Entrance from "./components/Main/Entrance";

library.add([faUser]);

class App extends Component {
  async componentDidMount() {
    await this.props.onGetRentalSpots();

    const auth = getAuth();
    if (auth) {
      await this.props.onInitUser(auth._id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <div className="content">
          <Switch>
            <Route path="/main" component={Main} />
            <Route path="/" component={Entrance} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onGetRentalSpots: () => dispatch(reqGetRentalSpots()),
  onInitUser: id => dispatch(reqGetUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
// export default connect()(App);
