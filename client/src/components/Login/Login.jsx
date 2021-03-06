import React from "react";
import { postAuth } from "../../services/auth";

import "./main.css";
import { reqLogin } from "../../actions/authActions";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.auth.user && this.props.auth.user) {
      return this.props.history.replace("/main");
    }
  }

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    this.setState({
      [name]: value
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    this.props.onLogin(this.state);
  };

  render() {
    const error = this.props.auth.error;

    return (
      <div className="signin-container text-center d-flex justify-content-center">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <span className="icon">
            <FontAwesomeIcon icon={faBicycle} size="7x" />
          </span>
          <h1 className="h3 mt-2 mb-3 font-weight-normal">어서오세요</h1>
          <label htmlFor="inputEmail" className="sr-only">
            이메일 주소
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
            name="username"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            비밀번호
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {error ? <ErrorMessage error={error} /> : null}
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            로그인
          </button>
          <hr />
          <div className="" />
          <p className="mt-5 mb-3 text-muted">© 2019</p>
        </form>
      </div>
    );
  }
}

function ErrorMessage({ error }) {
  return <div className="error-message alert alert-danger">{error}</div>;
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password }) => dispatch(reqLogin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
