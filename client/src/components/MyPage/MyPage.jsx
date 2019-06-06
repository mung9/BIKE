import React from "react";
import {connect} from 'react-redux';
import './main.css';

import {getUserName} from '../../auth/auth';

function MyPage(props) {
  return (
    <div className="container">
    <div className="row container-row">
      <div className="col top left" id="username">
        {`${getUserName()} 님`}
      </div>
      <div className="col top" id="rent_status">
        <text id="status">ⓘ {props.user.bike ? '자전거 대여 중':'자전거 대여 전'}</text>
        <text id="rent_time">{props.user.bike ? '(2019.06.07 15:32:50)' : ''}</text>
        <button className="btn btn-primary" id="return">
          반납
        </button>
      </div>
      <div className="w-100" />
      <div className="col left menu">회원정보 관리</div>
      <div className="col list">
        <div>> 개인정보 수정</div>
        <div>> 비밀번호 변경</div>
        <div>> 회원탈퇴</div>
      </div>
      <div className="w-100" />
      <div className="col left menu">결제 관리</div>
      <div className="col list">
        <div>> 결제 내역</div>
        <div>> 미납요금</div>
        <div>> 추가요금 결제</div>
      </div>
      <div className="w-100" />
      <div className="col left menu">이용정보 관리</div>
      <div className="col list">
        <div>> 대여 반납 이력</div>
        <div>> 이용권 내역</div>
        <div>> 대여신청 상태</div>
      </div>
    </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MyPage);
