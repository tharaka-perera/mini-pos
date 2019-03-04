import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, authCheck } from "../actions/loginAction";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    const signupButton = document.getElementById("signup");
    const loginButton = document.getElementById("login");

    signupButton.addEventListener("click", e => {
      let parent =
        e.target.tagName.toString() === "SPAN"
          ? e.target.parentNode.parentNode.parentNode
          : e.target.parentNode.parentNode;
      Array.from(parent.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
          loginButton.parentNode.classList.remove("slide-up");
        } else {
          loginButton.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });

    loginButton.addEventListener("click", e => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
          signupButton.parentNode.parentNode.classList.remove("slide-up");
        } else {
          signupButton.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });
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
      <div className="form-structor">
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
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
});

export default connect(
  mapStateToProps,
  { loginUser, authCheck }
)(Login);
