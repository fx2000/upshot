import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

// Authentication Middleware
import AuthProvider from './lib/AuthProvider';
import AnonRoute from './components/auth/AnonRoute';
import PrivateRoute from './components/auth/PrivateRoute';

// Components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Issues from './pages/Issues';
import Projects from './pages/Projects';
import CreateProject from './components/project/CreateProject';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  render () {
    return (
      <AuthProvider>
        <Navbar />
        <Container fluid={true} className="main">
          <Row>
            <Col sm={2}>
              <Sidebar />
            </Col>
            <Col sm={10}>
              <Switch>
                <AnonRoute path="/signup" component={Signup} />
                <AnonRoute path="/login" component={Login} />
                <PrivateRoute path="/issues" component={Issues} />
                <PrivateRoute path="/projects" component={Projects} />
                <PrivateRoute path="/create-project" component={CreateProject} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </AuthProvider>
    );
  }
}

export default App;
