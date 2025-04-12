import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Complaint.css';

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      showModal: false, 
      showNotLoggedInModal: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, subject, message } = this.state;
    const { userName } = this.props;

    if (!userName) {
     
      this.setState({ showNotLoggedInModal: true });
      return;
    }
  
    const complaintData = {
      name,
      email,
      subject,
      message,
    };
  
    if (userName) {
      try {
        const username = userName;
        const userResponse = await fetch(`http://localhost:4000/user/get-user-id/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (userResponse.ok) {
          const { user_id } = await userResponse.json();
          complaintData.user_id = user_id;
  
          // Send complaint data to the backend
          const response = await fetch('http://localhost:4000/complaint/create-complaint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(complaintData),
          });
  
          if (response.ok) {
         
            this.setState({
              name: '',
              email: '',
              subject: '',
              message: '',
              showModal: true, 
            });
          } else {
            console.error('Error submitting complaint:', response.statusText);
          }
        } else {
          console.error('Error fetching user ID:', userResponse.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('User not logged in');
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCloseModal = () => {
     
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
      showModal: false,
    });
  };

  render() {
    return (
      <div className="contact-page">
        <h2 className="contact-heading">Contact Us</h2>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="mb-2">
              <label htmlFor="subject" className="form-label">Subject:</label>
              <input type="text" className="form-control" id="subject" name="subject" value={this.state.subject} onChange={this.handleChange} required />
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="form-label">Message:</label>
              <textarea className="form-control" id="message" name="message" rows="3" value={this.state.message} onChange={this.handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Complaint Registered</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your complaint has been registered successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showNotLoggedInModal} onHide={() => this.setState({ showNotLoggedInModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Not Logged In</Modal.Title>
          </Modal.Header>
          <Modal.Body>Can't create a Complaint. Please log in first.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ContactPage;
