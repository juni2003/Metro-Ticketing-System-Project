import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Ticket from './components/ticket.component';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import ForgotPassword from './components/forgot-password.component';
import ContactPage from './components/complaint.component';
import Home from './components/Home';
import Profile from './components/profile.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem('userName') || ''
    };
  }

  handleLogin = (userName) => {
    this.setState({ userName });
    localStorage.setItem('userName', userName);
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.setState({ userName: '' });
  };

  render() {
    const { userName } = this.state;

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand d-flex align-items-center" to={'/'}>
                <h3>Welcome to Islamabad Metro</h3>
              </Link>
              <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/'}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/ticket'}>Ticket</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/contact'}>Complaints</Link>
                  </li>
                  
                  {userName ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/user-history'}>Welcome {userName}</Link>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link btn btn-link" to={'/sign-in'} onClick={this.handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/sign-in'}>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/sign-up'}>Sign up</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/ticket" element={<AuthWrapper><Ticket userName={userName} /></AuthWrapper>} />
              <Route path="/sign-in" element={<AuthWrapper><Login onLogin={this.handleLogin} /></AuthWrapper>} />
              <Route path="/sign-up" element={<AuthWrapper><SignUp /></AuthWrapper>} />
              <Route path="/forgot-password" element={<AuthWrapper><ForgotPassword /></AuthWrapper>} />
              <Route path="/contact" element={<AuthWrapper><ContactPage userName={userName} /></AuthWrapper>} />
              <Route path="/user-history" element={<Profile userName={userName} />} />

            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

const AuthWrapper = ({ children }) => (
  <div className="auth-wrapper">
    <div className="auth-inner">
      {children}
    </div>
  </div>
);

export default App;
