import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as rentActions from "../../actions/userActions";
import { getAuth } from "../../auth/auth";

function Holder(props) {
  const { index, isRentable, bike, onRent, authorized } = props;
  const className=`btn py-0 btn-${authorized?'primary':'secondary'}`;

  return (
    <tr>
      <td scope="row">{index}</td>
      <td>{isRentable ? "대여 가능" : "대여 불가"}</td>
      <td>
        <button className={className} onClick={onRent} disabled={!authorized}>
          대여
        </button>
      </td>
    </tr>
  );
}

Holder.propTypes = {
  index: PropTypes.number.isRequired,
  isRentable: PropTypes.bool,
  bike: PropTypes.object,
  authorized: PropTypes.bool
};

function BikeList(props) {
  const { rentalSpot, handleRent } = props;
  console.log('useruser:',props.user)

  const renderRows = bikes => {
    return bikes
      .map((bike, index) =>
        bike ? (
          <Holder
            index={index + 1}
            isRentable={true}
            bike={bike}
            onRent={
              props.user && props.user.bike
                ? () => alert("이미 대여중인 자전거가 있습니다!")
                : () => handleRent(rentalSpot, index)
            }
            authorized={getAuth()}
            key={bike._id}
          />
        ) : null
      )
      .filter(component => component);
  };

  return (
    <table className="bike-list table table-hover text-center">
      <thead>
        <tr>
          <th scope="col">거치대</th>
          <th scope="col">상태</th>
          <th scope="col" />
        </tr>
      </thead>

      <tbody>{renderRows(rentalSpot.bikes)}</tbody>
    </table>
  );
}

BikeList.propTypes = {
  rentalSpot: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleRent: (rentalSpot, index) => {
    const yes = confirm(`${index+1}번 거치대의 자전거를 대여하시겠습니까?`);
    if(!yes) return;
    return dispatch(rentActions.reqRent(rentalSpot, index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikeList);
