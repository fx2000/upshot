import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import users from '../../lib/user-service';

// Components
import UserListItem from '../../components/user/UserListItem';

// Bootstrap Components
import {
  Breadcrumb,
  Container,
  Row,
  Table
} from 'react-bootstrap';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount () {
    // Call users list API
    users.list().then(
      response => {
        const users = response.data;
        if (users.length > 0) {
          this.setState({ users });
        }
      }
    ).catch(error => console.log(error));
  }

  render () {
    console.log(this.state.users)
    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Team Members</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>Team Members</h2>
        </Row>
        <Row>
          <Table responsive className="table" striped hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Projects</th>
                <th>Issues</th>
                <th>Comments</th>
                <th>Following</th>
                <th>Assigned To</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((user, index) =>
                  <UserListItem
                    key = { index }
                    id = { user._id }
                    issues = { user.issues.length }
                    projects = { user.projects.length }
                    comments = { user.comments.length }
                    name = { user.firstName + ' ' + user.lastName}
                    avatar = {user.avatar}
                    email = {user.email}
                    following = {user.following.length}
                    assignedTo = {user.assignedTo.length}
                    created = { user.relativeDate }
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

export default withAuth(Team);
