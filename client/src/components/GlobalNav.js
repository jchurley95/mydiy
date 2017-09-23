import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Nav = styled.div`
    width: 95%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    background-color: rgba(2, 178, 208, 1);
    box-shadow: 0px 1px 6px black;
    color: white;
    a {
    text-decoration: none;
    margin: 0 5px;
    &:visited {
        color: white;
    }
    }
`;

class GlobalNav extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false
    };
  }

  componentWillMount() {
    this._isLoggedIn();
  }
  componentWillReceiveProps() {
    this._isLoggedIn();
  }

  _isLoggedIn = async () => {
    const response = await axios.get("/auth/validate_token");
    this.setState({
      user: response.data.data,
      loggedIn: response.data.success
    });
  };
  
  _logOut = async () => {
    console.log("CLICK");
    const response = await axios.delete("/auth/sign_out");
    //Forces refresh of browser
    window.location.reload();
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Nav>
          <Link to="/">
            <h1>Projects</h1>
          </Link>
          <div>
            <Link to="/new">New Project</Link>
            <span>Signed In As: <Link to={`/user/{user.id}`}> {this.state.user.email}</Link></span>
            <a href="#" onClick={this._logOut}> Log Out </a>
          </div>
        </Nav>
      );
    }
    return (
      <Nav>
        <Link to="/">
            <h1>Projects</h1>
        </Link>
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Log In</Link>
        </div>
      </Nav>
    );
  }
}

export default GlobalNav;
