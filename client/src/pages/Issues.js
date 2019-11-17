import React, { Component } from 'react';
import issues from '../lib/issue-service';
import Issue from '../components/issue/Issue';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

class Issues extends Component {
  constructor () {
    super();
    this.state = {
      issues: []
    };
  }

  componentDidMount () {
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
      <Container fluid={true}>
        <Row>
          <Breadcrumb>
            <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Issues</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Issues</h2>
        </Row>
        <Row>
          <Link to="/create-issue">Create Issue</Link>
        </Row>
        <Row>
          <Table responsive className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Title</th>
                <th>Description</th>
                <th>Project</th>
                <th>Creator</th>
                <th>Assigned To</th>
                <th>Followers</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.issues.map((issue, index) =>
                  <Issue
                    key = { index }
                    priority = { issue.priority }
                    status = {issue.status}
                    title = { issue.title }
                    description = { issue.content }
                    creator = { issue.creator.firstName + ' ' + issue.creator.lastName}
                    assignedTo = { issue.assignedTo.firstName + ' ' + issue.assignedTo.lastName }
                    followers = { issue.followers.length }
                    comments = { issue.comments.length }
                  />
                )
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default withAuth(Issues);
