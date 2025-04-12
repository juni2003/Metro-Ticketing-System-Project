import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';
import { Modal, Button } from 'react-bootstrap';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      gender: '',
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
    const { username, email, password, gender } = this.state;

    this.setState({ error: '', success: '' });

    if (!this.validateEmail(email)) {
      this.setState({ error: 'Please enter a valid email address' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters long' });
      return;
    }

    if (!username) {
      this.setState({ error: 'Username is required' });
      return;
    }

    if (!gender) {
      this.setState({ error: 'Gender is required' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/create-user', { username, email, password, gender });
      if (response.status === 201) {
        this.setState({ success: 'Registration successful!', showModal: true });
      }
    } catch (error) {
      if (error.response) {
        this.setState({ error: error.response.data.message });
      } else {
        this.setState({ error: 'An error occurred during registration' });
      }
    }
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  handleClose = () => {
    this.setState({ showModal: false });
    window.location.href = '/login'; 
  };

  render() {
    return (
      <div className="signup-container mt-5">
        <form onSubmit={this.handleSubmit}>
          <h3 className="signup-heading">Sign Up</h3>

          {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
          {this.state.success && <div className="alert alert-success">{this.state.success}</div>}

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={this.state.gender}
              onChange={this.handleInputChange}
            >
              <option value="">Select gender</option>
              
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
             
              
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>

        {/*  successful registration */}
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your account has been created successfully!</Modal.Body>
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
