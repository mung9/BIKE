import React from "react";
import PropTypes from "prop-types";

import BikeList from "./BikeList";

import "./main.css";

export default class Rent extends React.Component {

  render() {
    return (
      <div className="rent">
        <BikeList rentalSpot={this.props.rentalSpot}/>
      </div>
    );
  }
}

Rent.proptTypes = {
  rentalSpot: PropTypes.object.isRequired
};
