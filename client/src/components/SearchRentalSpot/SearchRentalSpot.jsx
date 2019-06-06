import React from "react";
import { connect } from "react-redux";
import { reqGetRentalSpots } from "../../actions/rentalSpotsActions";

import Rent from "../Rent/Rent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faFrownOpen } from "@fortawesome/free-solid-svg-icons";

import "./main.css";
import { select } from "redux-saga/effects";

const BY_NUMBER = "대여소 번호";
const BY_NAME = "대여소 명";

class SearchRentalSpot extends React.Component {
  state = {
    query: "",
    doModal: true,
    searchBy: BY_NAME,
    selectedRentalSpotId: ""
  };

  componentDidMount() {
    this.props.loadRentalSpots();
  }

  handleSelectRentalSpot = rentalSpot => {
    this.setState({ selectedRentalSpotId: rentalSpot._id });
  };

  handleChangeSearchMethod = method => {
    this.setState({ searchBy: method });
  };

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    this.setState({
      [name]: value
    });
  };

  getFilteredRentalSpots = () => {
    const { query } = this.state;
    let propertyName = "num";
    if (this.state.searchBy === BY_NAME) propertyName = "name";

    return this.props.rentalSpots.filter(rentalSpot => {
      return (rentalSpot[propertyName] + "")
        .trim()
        .replace(" ", "")
        .match(new RegExp(query, "i"));
    });
  };

  render() {
    const filteredRentalSpots = this.getFilteredRentalSpots();
    const { selectedRentalSpotId } = this.state;
    const selectedRentalSpot = filteredRentalSpots.find(
      rentalSpot => rentalSpot._id === selectedRentalSpotId
    );
    return (
      <div className="search-rental-spot">
        <SearchBar
          value={this.state.query}
          onChange={this.handleChange}
          searchBy={this.state.searchBy}
          onChangeSearchMethod={this.handleChangeSearchMethod}
        />
        <div className="search-rental-spot__dashboard">
          <RentalSpotsResult
            rentalSpots={filteredRentalSpots}
            onClick={this.handleSelectRentalSpot}
            selectedRentalSpot={selectedRentalSpot}
          />
          {selectedRentalSpot ? (
            <RentalSpotSpecResult rentalSpot={selectedRentalSpot} />
          ) : null}
        </div>
      </div>
    );
  }
}

function RentalSpotsResult({ rentalSpots, onClick, selectedRentalSpot }) {
  if (!rentalSpots || rentalSpots.length < 1) {
    return (
      <div className="rental-spots-result no-result">
        <div className="notify">
          {/* <FontAwesomeIcon icon={faFrownOpen} className="mr-2" /><br/> */}
          😧
          <br />
          <span>검색된 대여소가 없어요</span>
        </div>
      </div>
    );
  }

  return (
    <ul className="rental-spots-result list-group">
      {rentalSpots.map(rentalSpot => {
        const className = `rental-spot list-group-item ${
          rentalSpot === selectedRentalSpot
            ? "list-group-item-info"
            : null
        }`;
        return (
          <li
            className={className}
            onClick={() => onClick(rentalSpot)}
            key={rentalSpot._id}
          >
            <span>{`[${rentalSpot.num}] ${rentalSpot.name} (${
              rentalSpot.bikes.filter(bike => bike).length
            }대 가능)`}</span>
          </li>
        );
      })}
    </ul>
  );
}

function RentalSpotSpecResult({ rentalSpot }) {
  return (
    <div className="rental-spot-spec-result">
      <h2 className="my-4">{`${rentalSpot.name} 자전거 현황`}</h2>
      <Rent rentalSpot={rentalSpot} />
      {/* <ul>
        {rentalSpot.bikes
          .map((bike, index) => {
            return bike ? <li>{`[${index + 1}]번 자전거 대여 가능`}</li> : null;
          })
          .filter(item => item)}
      </ul> */}
    </div>
  );
}

function SearchBar(props) {
  const { value, onChange, searchBy, onChangeSearchMethod } = props;

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          {searchBy}
        </button>
        <div className="search-methods dropdown-menu" id="dropdown-methods">
          <a
            className="search-method dropdown-item"
            href="#"
            name={BY_NUMBER}
            onClick={() => onChangeSearchMethod(BY_NUMBER)}
          >
            {BY_NUMBER}
          </a>
          <a
            className="search-method dropdown-item"
            href="#"
            name={BY_NAME}
            onClick={() => onChangeSearchMethod(BY_NAME)}
          >
            {BY_NAME}
          </a>
        </div>
      </div>
      <input
        type="text"
        className="dropdown form-control dropdown-toggle"
        aria-label="Text input with segmented dropdown button"
        name="query"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  rentalSpots: state.rentalSpots
});

const mapDispatchToProps = dispatch => ({
  loadRentalSpots: () => dispatch(reqGetRentalSpots())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRentalSpot);
