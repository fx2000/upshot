import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';

// Components
import PriorityPie from '../components/dashboard/PriorityPie';
import IssueTimeline from '../components/dashboard/IssueTimeline';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
  Col
} from 'react-bootstrap';


class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: '',
      projects: '',
      issues: ''
    };
  }

  render () {
    return (
      <Container fluid>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>Dashboard</h2>
        </Row>
        <Row>
          <Col sm={6}>
            <Container className="pie">
              <PriorityPie />
              <div>
                <ul>
                  <li className="low">Low</li>
                  <li className="medium">Medium</li>
                  <li className="high">High</li>
                  <li className="critical">Critical</li>
                </ul>
              </div>
            </Container>
          </Col>
          <Col sm={6}>
            <Container>
              <IssueTimeline />
              <div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(Dashboard);
