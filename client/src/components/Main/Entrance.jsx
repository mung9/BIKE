import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Main from "./Main";

import "./main.css";
import { connect } from "react-redux";

import { getAuth } from "../../auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

class Entrance extends React.Component {
  componentWillMount() {
    if (getAuth()) {
      this.props.history.replace("/main");
    }
  }
  render() {
    return (
      <div className="main text-center d-flex justify-content-center">
        <div className="entrance">
          <div className="entrance__btn-container">
            <Link className="link-login" to="/login">
              <button className="btn-container__btn">
                <span className="btn-label">로그인</span>
                <span className="btn-icon">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </span>
              </button>
            </Link>
            <Link className="link-main" to="/main">
              <button className="btn-container__btn">
                <span className="btn-label">비회원</span>
                <span className="btn-icon">
                  <FontAwesomeIcon icon={faUserAlt} size="2x" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Entrance);
