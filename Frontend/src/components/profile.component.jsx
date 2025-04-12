import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTicketAlt, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ handleSectionChange }) => (
  <div className="sidebar">
    <ul className="nav flex-column">
      <li className="nav-item" onClick={() => handleSectionChange('profile')}>
        <FontAwesomeIcon icon={faUser} />
        <span style={{ marginLeft: "5px" }}>Profile</span>
      </li>
      <li className="nav-item" onClick={() => handleSectionChange('tickets')}>
        <FontAwesomeIcon icon={faTicketAlt} />
        <span style={{ marginLeft: "5px" }}>Ticket History</span>
      </li>
      <li className="nav-item" onClick={() => handleSectionChange('updatePassword')}>
        <FontAwesomeIcon icon={faKey} />
        <span style={{ marginLeft: "5px" }}>Update Password</span>
      </li>
      <li className="nav-item" onClick={() => handleSectionChange('updateEmail')}>
        <FontAwesomeIcon icon={faEnvelope} />
        <span style={{ marginLeft: "5px" }}>Update Email</span>
      </li>
    </ul>
  </div>
);

const Profile = ({ userData }) => (
  <div className="table-container">
    <h3>Profile</h3>
    <table className="table">
      <tbody>
        <tr>
          <td>Username:</td>
          <td>{userData.username}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{userData.email}</td>
        </tr>
        <tr>
          <td>Gender:</td>
          <td>{userData.gender}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TicketHistory = ({ ticketHistory, currentPage, ticketsPerPage, handlePrevPage, handleNextPage, isTicketExpired }) => (
  <div style={{marginTop: "13%"}} className="table-container">
    <h3>Ticket History</h3>
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Ticket ID</th>
          <th>Created At</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {ticketHistory.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage).map((ticket, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ticket._id}</td>
            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
            <td>{isTicketExpired(ticket.createdAt) ? 'Expired' : 'Valid'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <button onClick={handleNextPage} disabled={currentPage === Math.ceil(ticketHistory.length / ticketsPerPage)}>Next</button>
    </div>
  </div>
);

const UpdatePassword = ({ currentPassword, newPassword, handleInputChange, handleUpdatePassword }) => (
  <div className="table-container">
    <h3>Update Password</h3>
    <form onSubmit={handleUpdatePassword}>
      <div className="mb-3">
        <label>Current Password</label>
        <input
          type="password"
          className="form-control"
          name="currentPassword"
          value={currentPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Password</button>
    </form>
  </div>
);

const UpdateEmail = ({ newEmail, handleInputChange, handleUpdateEmail }) => (
  <div className="table-container">
    <h3>Update Email</h3>
    <form onSubmit={handleUpdateEmail}>
      <div className="mb-3">
        <label>New Email</label>
        <input
          type="email"
          className="form-control"
          name="newEmail"
          value={newEmail}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Email</button>
    </form>
  </div>
);

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      ticketHistory: [],
      currentSection: 'profile',
      currentPassword: '',
      newPassword: '',
      newEmail: '',
      success: '',
      error: '',
      currentPage: 1,
      ticketsPerPage: 5
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchTicketHistory();
  }

  fetchUserData = async () => {
    const username = this.props.userName;
    try {
      const userIdResponse = await axios.get(`http://localhost:4000/user/get-user-id/${username}`);
      const userId = userIdResponse.data.user_id;
      console.log(userId);

      const userResponse = await axios.get(`http://localhost:4000/user/get-single-user/${userId}`);
      this.setState({ userData: userResponse.data.user });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchTicketHistory = async () => {
    const username = this.props.userName;
    try {
      const response = await axios.get(`http://localhost:4000/user/ticket-history/${username}`);
      const ticketHistory = response.data.ticket_history;

      const ticketDetailsPromises = ticketHistory.map(ticket =>
        axios.get(`http://localhost:4000/ticketing/ticket/${ticket}`)
      );

      const ticketDetailsResponses = await Promise.all(ticketDetailsPromises);
      const detailedTicketHistory = ticketDetailsResponses.map(res => res.data.ticket);

      this.setState({ ticketHistory: detailedTicketHistory });
    } catch (error) {
      console.error('Error fetching ticket history:', error);
    }
  };

  handleSectionChange = (section) => {
    this.setState({ currentSection: section });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUpdatePassword = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword } = this.state;
    const username = this.props.userName;

    try {
      const response = await axios.patch(`http://localhost:4000/user/update-password/${username}`, { currentPassword, newPassword });
      this.setState({ success: response.data.message, error: '', currentPassword: '', newPassword: '' });
    } catch (error) {
      this.setState({ error: error.response.data.message, success: '' });
    }
  };

  handleUpdateEmail = async (event) => {
    event.preventDefault();
    const { newEmail } = this.state;
    const username = this.props.userName;

    try {
      const response = await axios.patch(`http://localhost:4000/user/update-email/${username}`, { email: newEmail });
      this.setState({ success: 'Email updated successfully!', error: '', newEmail: '' });
    } catch (error) {
      this.setState({ error: error.response.data.message || 'Error updating email', success: '' });
    }
  };

  isTicketExpired = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    const sevenHours = 7 * 60 * 60 * 1000;
    return currentTime - createdTime > sevenHours;
  };

  handlePrevPage = () => {
    this.setState(prevState => ({
      currentPage: Math.max(prevState.currentPage - 1, 1)
    }));
  };

  handleNextPage = () => {
    this.setState(prevState => ({
      currentPage: Math.min(prevState.currentPage + 1, Math.ceil(this.state.ticketHistory.length / this.state.ticketsPerPage))
    }));
  };

  render() {
    const { userData, ticketHistory, currentSection, currentPassword, newPassword, newEmail, success, error, currentPage, ticketsPerPage } = this.state;

    return (
      <div style={{overflow: 'scroll'}} className="user-profile-container">
        <Sidebar handleSectionChange={this.handleSectionChange} />
        <div className="main-content">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {currentSection === 'profile' && <Profile userData={userData} />}
          {currentSection === 'tickets' && (
            <TicketHistory
              ticketHistory={ticketHistory}
              currentPage={currentPage}
              ticketsPerPage={ticketsPerPage}
              handlePrevPage={this.handlePrevPage}
              handleNextPage={this.handleNextPage}
              isTicketExpired={this.isTicketExpired}
            />
          )}
          {currentSection === 'updatePassword' && (
            <UpdatePassword
              currentPassword={currentPassword}
              newPassword={newPassword}
              handleInputChange={this.handleInputChange}
              handleUpdatePassword={this.handleUpdatePassword}
            />
          )}
          {currentSection === 'updateEmail' && (
            <UpdateEmail
              newEmail={newEmail}
              handleInputChange={this.handleInputChange}
              handleUpdateEmail={this.handleUpdateEmail}
            />
          )}
        </div>
      </div>
    );
  }
}
