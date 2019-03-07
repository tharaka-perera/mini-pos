import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, authCheck } from "../actions/loginAction";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    // const signupButton = document.getElementById("signup");
    // const loginButton = document.getElementById("login");
    // signupButton.addEventListener("click", e => {
    //   let parent =
    //     e.target.tagName.toString() === "SPAN"
    //       ? e.target.parentNode.parentNode.parentNode
    //       : e.target.parentNode.parentNode;
    //   Array.from(parent.classList).find(element => {
    //     if (element !== "slide-up") {
    //       parent.classList.add("slide-up");
    //       loginButton.parentNode.classList.remove("slide-up");
    //     } else {
    //       loginButton.parentNode.classList.add("slide-up");
    //       parent.classList.remove("slide-up");
    //     }
    //   });
    // });
    // loginButton.addEventListener("click", e => {
    //   let parent = e.target.parentNode;
    //   Array.from(e.target.parentNode.classList).find(element => {
    //     if (element !== "slide-up") {
    //       parent.classList.add("slide-up");
    //       signupButton.parentNode.parentNode.classList.remove("slide-up");
    //     } else {
    //       signupButton.parentNode.parentNode.classList.add("slide-up");
    //       parent.classList.remove("slide-up");
    //     }
    //   });
    // });
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    const auth = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(auth);
    // console.log("props", this.props.login);
    // console.log(this.props.token);

    // fetch("/login", {
    //   method: "POST",
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       console.log("logged in");
    //       this.props.history.push("/");
    //     } else {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert("Error logging in please try again");
    //   });
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="form-structor">
          <div className="signup">
            <h2 className="form-title" id="login">
              <span>or</span>Log in
            </h2>
            <div className="form-holder">
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
            </div>
            <button className="submit-btn" onClick={this.onSubmit}>
              Log in
            </button>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="signup">
                <span>or</span>Sign up
              </h2>
              <div className="form-holder">
                <input type="email" className="input" placeholder="Email" />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
              </div>
              <button className="submit-btn">Sign up</button>
            </div>
          </div>
        </div> */}

        {/* <div class="container-loader">
          <svg
            class="loader"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 340 340"
          >
            <circle cx="170" cy="170" r="160" stroke="#1dc8cd" />
            <circle cx="170" cy="170" r="135" stroke="#13567c" />
            <circle cx="170" cy="170" r="110" stroke="#1dc8cd" />
            <circle cx="170" cy="170" r="85" stroke="#13567c" />
          </svg>
        </div> */}

        <div className="container login-container">
          <div className="row">
            <div className="col-md-6 login-form-1">
              <h3>Login</h3>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Your Email *"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Your Password *"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btnSubmit"
                    value="Login"
                    onClick={this.onSubmit}
                  />
                </div>
                {/* <div className="form-group">
                  <a href="#" className="ForgetPwd">
                    Forget Password?
                  </a>
                </div> */}
              </form>
            </div>
            <div className="col-md-6 login-form-2">
              <h3>Signup</h3>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password *"
                  />
                </div>
                <div className="form-group">
                  <input type="submit" className="btnSubmit" value="Signup" />
                </div>
                {/* <div className="form-group">
                  <a href="#" className="ForgetPwd" value="Login">
                    Forget Password?
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>

        {/* #contact */}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  authCheck: PropTypes.func,
  login: PropTypes.object
};

const mapStateToProps = state => ({
  login: state.login
});

export default connect(
  mapStateToProps,
  { loginUser, authCheck }
)(Login);
