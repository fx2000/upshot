import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// Authentication Middleware
import AuthProvider from './lib/AuthProvider';
import AnonRoute from './components/auth/AnonRoute';
import PrivateRoute from './components/auth/PrivateRoute';

// Components
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

// Bootstrap Components
/* import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; */

class App extends Component {
  render () {
    return (
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />

          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
