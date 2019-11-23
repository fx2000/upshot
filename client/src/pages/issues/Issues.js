import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import IssueListItem from '../../components/issue/IssueListItem';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
  Button
} from 'react-bootstrap';

class Issues extends Component {
  constructor () {
    super();
    this.state = {
      issues: []
    };
  }

  componentDidMount () {
    // Call issues list API
    issues.list().then(
      response => {
        const issues = response.data;
        if (issues.length > 0) {
          this.setState({ issues });
        }
      }
    ).catch(error => console.log(error));
  }

  render () {
    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Issues</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>Issues</h2>
          <LinkContainer to="/issues/create"><Button variant="upshot">Create Issue</Button></LinkContainer>
        </Row>
        <Row>
          { /* Add "Assigned To" column */}
          <IssueListItem
            issues = { this.state.issues }
          />
        </Row>
      </Container>
    );
  }
}

export default withAuth(Issues);
