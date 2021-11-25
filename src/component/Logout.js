import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(''));
  }
  render() {
    return <Navigate to="/" />;
  }
}

export default connect()(Logout);