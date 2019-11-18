import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import IssueListItem from '../../components/issue/IssueListItem';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
  Table
} from 'react-bootstrap';

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
          <Link to="/issues/create">Create Issue</Link>
        </Row>
        <Row>
          <Table responsive className="table">
            <thead>
              <tr>
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
                  <IssueListItem
                    key = { index }
                    id = { issue._id }
                    priority = { issue.priority }
                    status = {issue.status}
                    title = { issue.title }
                    description = { issue.content }
                    projectId = { issue.project._id }
                    projectName = { issue.project.name }
                    creatorId = { issue.creator._id }
                    creatorName = { issue.creator.firstName + ' ' + issue.creator.lastName}
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
