import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, authCheck } from '../actions/loginAction';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
  	email: '',
  	password: ''
  };

  handleInputChange = event => {
  	const { value, name } = event.target;
  	this.setState({
  		[ name ]: value
  	});
  };

  onSubmit = event => {
  	event.preventDefault();
  	// console.log(this.state);
  	const auth = {
  		email: this.state.email,
  		password: this.state.password
  	};

  	this.props.loginUser(auth).catch(() => alert('Invalid credentials.!'));
  };

  render() {
  	return (
  		<React.Fragment>
          <div className="container login-container">
      <div className="row">
  					<div className="col-md-6 login-form-1">
              <h3 className="heading-class">Login</h3>
              <form>
  							<div className="form-group">
                      <input
  									type="text"
  									name="email"
  									className="form-control input-email"
  									placeholder="Your Email *"
  									onChange={ this.handleInputChange }
  								/>
  							</div>
  							<div className="form-group">
  								<input
  									type="password"
  									name="password"
  									className="form-control"
  									placeholder="Your Password *"
  									onChange={ this.handleInputChange }
  								/>
  							</div>
      <div className="form-group">
  								<input
  									type="submit"
  									className="btnSubmit btnLogin"
  									value="Login"
  									onClick={ this.onSubmit }
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
