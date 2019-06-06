import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export function getAuth() {
  return JSON.parse(window.sessionStorage.getItem('user'))
}

export function sayUserName() {
  const name = getUserName(getAuth().username);
  return (
    <div className="say-user">
      <FontAwesomeIcon icon={faUserCircle} />
      <span>{`${name}님`}</span>
    </div>
  );
}

export function   getUserName() {
  const email = getAuth().username;
  const atIndex = email.indexOf("@");
  return email.slice(0, atIndex);
}
