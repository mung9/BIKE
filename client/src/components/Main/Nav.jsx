import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <Link to="/favorites">
        <button className="bottom-nav__btn">즐겨찾는 대여소</button>
      </Link>
      <Link to="/my">
        <button className="bottom-nav__btn-center">My</button>
      </Link>
      <Link to="/buy-ticket">
        <button className="bottom-nav__btn">이용권 구매</button>
      </Link>
    </nav>
  );
}