import React from "react";
import {Link} from 'react-router-dom';
import { getAuth } from "../../auth/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const logout = () => {
    const yes = confirm("정말로 로그아웃 할꺼에요?");
    if (!yes) return;

    window.sessionStorage.removeItem("user");
    props.history.replace("/");
  };

  const auth = getAuth();

  return (
    <header className="bike-header">
      <div className="navbar navbar-dark shadow-sm">
        <div className="container d-flex justify-content-between">
        <Link className="logo navbar-brand d-flex align-items-center" to='/'>
            <h1>BIKE</h1>
          </Link>
          <div className="user-nav">
            {auth ? sayUserName(auth.username) : null}
            {auth ? (
              <a href="#" className="btn-logout" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>로그아웃</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function sayUserName(username) {
  const name = extractName(username);
  return (
    <div className="say-user">
      <FontAwesomeIcon icon={faUserCircle} />
      <span>{`${name}님`}</span>
    </div>
  );
}

function extractName(email) {
  const atIndex = email.indexOf("@");
  return email.slice(0, atIndex);
}
