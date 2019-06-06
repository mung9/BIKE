import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "../../auth/auth";

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <Link to="/favorites">
        <button className="bottom-nav__btn">
          <i>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </i>
          <span>즐겨찾는 대여소</span>
        </button>
      </Link>
      <Link to="/mypage" >
      <button className="bottom-nav__btn-center">
        <span>My</span>
      </button>
      </Link>
      <Link to="/buy-ticket">
        <button className="bottom-nav__btn">
          <i>
            <FontAwesomeIcon icon={faTicketAlt} />
          </i>
          <span>이용권 구매</span>
        </button>
      </Link>
    </nav>
  );
}
