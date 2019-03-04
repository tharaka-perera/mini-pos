import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Button,
  NavbarBrand,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, authCheck } from "../actions/loginAction";
import Login from "./Login";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  logOut = e => {
    e.preventDefault();
    fetch("api/user/logout", { method: "POST" }).then(res => {
      if (res.status === 200) this.props.authCheck();
    });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <Navbar dark expand="sm" fixed="top">
        <Container>
          <NavbarBrand href="/">Cake Mini-POS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavItem>
              <Button className="btn btn-success" onClick={this.logOut}>
                Log out
              </Button>
            </NavItem>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
  return {
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { loginUser, authCheck }
)(AppNavBar);
