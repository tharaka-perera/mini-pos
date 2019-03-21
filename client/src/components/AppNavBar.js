import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, authCheck } from "../actions/loginAction";

class AppNavBar extends Component {
  state = {
    // eslint-disable-line
    isOpen: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.navbarFixed);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.navbarFixed);
  }

  logOut = e => {
    e.preventDefault();
    fetch("api/user/logout", { method: "POST" }).then(res => {
      if (res.status === 200) this.props.authCheck();
    });
  };

  navbarFixed = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("header").classList.add("header-fixed");
    } else {
      document.getElementById("header").classList.remove("header-fixed");
    }
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
    // <Navbar dark expand="sm" fixed="top">
    //   <Container>
    //     <NavbarBrand href="/">Cake Mini-POS</NavbarBrand>
    //     <NavbarToggler onClick={this.toggle} />
    //     <Collapse isOpen={this.state.isOpen} navbar>
    //       <NavItem>
    //         <Button className="btn btn-success" onClick={this.logOut}>
    //           Log out
    //         </Button>
    //       </NavItem>
    //     </Collapse>
    //   </Container>
    // </Navbar>

      <header id="header">
        <div className="container">
          <div id="logo" className="pull-left">
            <h1>
              <a href="#intro" className="scrollto">
                Cake Mini-POS
              </a>
            </h1>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li>
                <button className="logout align-middle" onClick={this.logOut}>
                  Log out
                </button>
              </li>
            </ul>
          </nav>
          {/* #nav-menu-container */}
        </div>
      </header>
    );
  }
}

AppNavBar.propTypes = {
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
