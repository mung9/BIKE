import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTicketAlt,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import "./main.css";

import { getUserName, getAuth } from "../../auth/auth";
import { reqReturn } from "../../actions/userActions";

function MyPage(props) {
  const auth = getAuth();
  if (!auth) props.history.replace("/login");

  const { onReturn, user } = props;
  const onClickReturn = () => {
    if (!auth || !user.bike) return;
    const { rentalSpot, index } = getEmptyHolder(props.rentalSpots);

    return onReturn(rentalSpot, index, user.bike);
  };

  return (
    <div className="container">
      <div className="row container-row">
        <div className="col top left" id="username">
          {`${auth ? getUserName() : ""} 님`}
        </div>
        <div className="col top" id="rent_status">
          <BikeRentalStatus user={user} onClickReturn={onClickReturn}/>
        </div>
        <div className="w-100" />
        <div className="table row">
          <div className="col left menu">
            <div className="menu-icon">
              <i>
                <FontAwesomeIcon icon={faUser} size="3x" />
              </i>
            </div>
            <div className="menu-label">
              <span>회원정보 관리</span>
            </div>
          </div>
          <div className="col list">
            <div>> 개인정보 수정</div>
            <div>> 비밀번호 변경</div>
            <div>> 회원탈퇴</div>
          </div>
          <div className="w-100" />
          <div className="col left menu">
            <div className="menu-icon">
              <i>
                <FontAwesomeIcon icon={faTicketAlt} size="3x" />
              </i>
            </div>
            <div className="menu-label">
              <span>결제 관리</span>
            </div>
          </div>
          <div className="col list">
            <div>> 결제 내역</div>
            <div>> 미납요금</div>
            <div>> 추가요금 결제</div>
          </div>
          <div className="w-100" />
          <div className="col left menu">
            <div className="menu-icon">
              <i>
                <FontAwesomeIcon icon={faFileAlt} size="3x" />
              </i>
            </div>
            <div className="menu-label">
              <span>이용정보 관리</span>
            </div>
          </div>
          <div className="col list">
            <div>> 대여 반납 이력</div>
            <div>> 이용권 내역</div>
            <div>> 대여신청 상태</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function fillZero(n){
  return n<10?'0'+n:n;
}

function format(date){
  if(!date.getFullYear) return null;
  const yyyy = date.getFullYear();
  const MM = fillZero(date.getMonth()+1);
  const dd = fillZero(date.getDate());

  const hh = fillZero(date.getHours());
  const mm = fillZero(date.getMonth());
  const ss = fillZero(date.getSeconds());

  return `${yyyy}.${MM}.${dd} ${hh}:${mm}:${ss}`;
}

function BikeRentalStatus({ user, onClickReturn }) {
  const bike = user ? user.bike : null;
  const rentStart = new  Date(user.rentStart);
  const timeStamp = format(rentStart);
  return (
    <React.Fragment>
      <span id="status">ⓘ {bike ? "자전거 대여 중" : "자전거 대여 전"}</span>
      <span id="rent_time">{bike ? ` (${timeStamp})` : ""}</span>
      {bike ? (
        <button className="btn btn-primary" id="return" onClick={onClickReturn}>
          반납
        </button>
      ) : null}
    </React.Fragment>
  );
}

function getEmptyHolder(rentalSpots) {
  let rentalSpot = null;
  let index = -1;
  const maxIndex = rentalSpots.length - 1;
  const iterCount = 50;
  for (let i = 0; !(index >= 0) && i < iterCount; ++i) {
    rentalSpot = rentalSpots[i];
    index = rentalSpot.bikes.findIndex(bike => !bike);
    console.log(!(index >= 0));
  }

  return { rentalSpot, index };
}

const mapStateToProps = state => ({
  user: state.user,
  rentalSpots: state.rentalSpots
});

const mapDispatchToProps = dispatch => ({
  onReturn: (rentalSpot, index, bike) =>
    dispatch(reqReturn(rentalSpot, index, bike))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
