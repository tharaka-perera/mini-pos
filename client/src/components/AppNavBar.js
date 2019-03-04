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

class AppNavBar extends Component {
  state = {
    isOpen: false
  };
  logOut = e => {
    e.preventDefault();
    fetch("api/user/logout", { method: "POST" }).then(res => {
      console.log(res);
      window.location.reload();
    });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default AppNavBar;
