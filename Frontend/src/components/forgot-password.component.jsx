import React, { Component } from 'react';
import axios from 'axios';
import './forgot-password.css'; // Import the CSS file

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    try {
      const response = await axios.post('http://localhost:4000/user/forgot-password', { email });
      if (response.data.success) {
        alert('Password sent to your email!');
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('There was an error sending the request:', error);
    }
  };

  render() {
    return (
      <div className="forgot-password-container"> {/* Update className */}
        <form onSubmit={this.handleSubmit}>
          <h3>Forgot Password</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
