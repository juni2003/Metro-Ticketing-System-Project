import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.jpg';
import './Ticket.css';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoute: '',
      price: '',
      currentTime: this.getCurrentTime(),
      showModal: false,
      showNotLoggedInModal: false,
      ticketData: null,
    };

    this.routes = [
      { id: '6654177487fa31463dc5c7b9', name: 'Route 1', price: 30 },
      { id: '66584584c17f66edcbeb61ef', name: 'Route 2', price: 50 },
      { id: '665845bfc17f66edcbeb61f1', name: 'Route 3', price: 100 },
    ];
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({ currentTime: this.getCurrentTime() });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  };

  getValidTillTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  };

  handleRouteChange = (event) => {
    const selectedRouteId = event.target.value;
    const selectedRoute = this.routes.find(route => route.id === selectedRouteId);
    this.setState({
      selectedRoute: selectedRouteId,
      price: selectedRoute ? selectedRoute.price : '',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { selectedRoute } = this.state;
    const { userName } = this.props;
  

    if (!userName) {
     
      this.setState({ showNotLoggedInModal: true });
      return;
    }
  
    try {
      const userResponse = await fetch(`http://localhost:4000/user/get-user-id/${userName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!userResponse.ok) {
        console.error('Error fetching user ID:', userResponse.statusText);
        return;
      }
  
      const { user_id } = await userResponse.json();
  
      const response = await axios.post('http://localhost:4000/ticketing/create-ticket', {
        user_id,
        route_id: selectedRoute,
      });
  
      if (response.data.success) {
        this.setState({ 
          showModal: true,
          ticketData: response.data.ticket,
        }, this.generatePDF);
      } else {
        alert('Failed to create ticket.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  generatePDF = () => {
    const { ticketData } = this.state;
    const username = this.props.userName;
    if (!ticketData || !username) return;
  
    const doc = new jsPDF();
  
    // Adding Metro Bus Service heading
    doc.setFontSize(18);
    doc.setTextColor('#007bff'); // Primary color
    doc.text('Metro Bus Service', 105, 15, null, null, 'center');
  
    // Adding a logo
    const logoImg = new Image();
    logoImg.src = logo;
    doc.addImage(logoImg, 'PNG', 10, 10, 30, 30); // Adjust the dimensions as needed
  
    // Adding the ticket details heading
    doc.setFontSize(14);
    doc.setTextColor('#6c757d'); // Secondary color
    doc.text('Ticket Details', 105, 40, null, null, 'center');
  
    // Creating the ticket details table
    const tableData = [
      ['User Name', username],
      ['User ID', ticketData.user_id],
      ['Ticket ID', ticketData._id],
      ['Date', new Date(ticketData.createdAt).toLocaleDateString()],
      ['Time of Creation', new Date(ticketData.createdAt).toLocaleTimeString()],
      ['Valid Till', this.getValidTillTime()],
      ['Price', `${this.state.price} PKR`],
    ];
  
    doc.autoTable({
      startY: 50,
      head: [['Field', 'Details']],
      body: tableData,
      styles: {
        fontSize: 12,
        cellPadding: 5,
        textColor: '#343a40', // Text color
        lineColor: '#007bff', // Primary color
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: '#007bff', // Primary color
        textColor: '#ffffff', // White color for text
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: '#f8f9fa', // Light grey for alternate rows
      },
      tableLineColor: '#007bff', // Primary color for table border
      tableLineWidth: 0.1,
    });
  
    // Save the PDF
    doc.save(`${username}_ticket.pdf`);
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="ticket-container">
        <h3 style={{marginBottom: "2%"}} className="ticket-heading">Get a Ticket</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Metro Route</label>
            <select
              className="form-control"
              value={this.state.selectedRoute}
              onChange={this.handleRouteChange}
            >
              <option value="">Select your Metro Bus Route</option>
              {this.routes.map(route => (
                <option key={route.id} value={route.id}>
                  {route.name} - {route.price} PKR
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control read"
              value={this.state.price}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="text"
              className="form-control read"
              value={new Date().toDateString()}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Current Time</label>
            <input
              type="text"
              className="form-control read"
              value={this.state.currentTime}
              readOnly
            />
          </div>

          <div className="mb-3 read">
            <label className="form-label">Valid Till Time</label>
            <input
              type="text"
              
              className="form-control "
              value={this.getValidTillTime()}
              readOnly
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create Ticket
            </button>
          </div>
        </form>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your ticket has been created successfully!</Modal.Body>
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
          <Modal.Body>Can't create a ticket. Please log in first.</Modal.Body>
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

export default Ticket;
