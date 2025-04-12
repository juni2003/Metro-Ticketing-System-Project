import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      success: '',
      showModal: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.setState({ error: '', success: '' });

    if (!this.validateEmail(email)) {
      this.setState({ error: 'Please enter a valid email address' });
      return;
    }

    if (password.length < 5) {
      this.setState({ error: 'Password must be at least 5 characters long' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, password });
      if (response.status === 200) {
        this.setState({ success: 'Login successful!', showModal: true });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        this.props.onLogin(response.data.username);
      }
    } catch (error) {
      if (error.response) {
        this.setState({ error: error.response.data.message });
      } else if (error.request) {
        this.setState({ error: 'Network error. Please try again.' });
      } else {
        this.setState({ error: 'An error occurred. Please try again.' });
      }
    }
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  handleClose = () => {
    this.setState({ showModal: false });
    window.location.href = '/';
  };

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <h3 className="login-heading">Sign In</h3>

          {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
          {this.state.success && <div className="alert alert-success">{this.state.success}</div>}

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>

          

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/forgot-password">Forgot password?</a>
          </p>
        </form>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have successfully logged in!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
