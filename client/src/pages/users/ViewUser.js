import React, { Component } from 'react';
import users from '../../lib/user-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import UserComments from '../../components/user/UserComments';
import UserProjects from '../../components/user/UserProjects';
import UserIssues from '../../components/user/UserIssues';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button,
  Table
} from 'react-bootstrap';

class ViewUser extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentDidMount () {
    // Call user details API
    const { id } = this.props.match.params;
    users.details(id).then(
      response => {
        const user = response.data;
        this.setState({
          user: user
        });
      }
    ).catch(error => console.log(error));
  }

  render () {
    // Check user properties to define button rendering
    let update = false;
    if (this.state.user) {
      if (this.props.user._id === this.state.user._id) {
        update = true;
      }
    }
    console.log(this.state.user)

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/users"><Breadcrumb.Item>Team members</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>User Details</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>{this.state.user.firstName + ' ' + this.state.user.lastName}</h2>
          <div>
            {
              this.state.user && update ?
                <LinkContainer to={'/users/' + this.state.user._id + '/update'}><Button variant="upshot">Update</Button></LinkContainer> : null
            }
          </div>
        </Row>
        <Row>
          <Container fluid>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid className="project-details">
                  <Row>
                    <img src={this.state.user.avatar} alt={this.state.user.firstName + ' ' + this.state.user.lastName} className="project-image"/>
                  </Row>
                  <Row>
                    <Container>
                      <h5>Joined { this.state.user.relativeDate }</h5>
                      <h6>Projects: { this.state.user.projects && this.state.user.projects.length }</h6>
                      <h6>Issues: { this.state.user.issues && this.state.user.issues.length }</h6>
                      <h6>Following: { this.state.user.following && this.state.user.following.length }</h6>
                      <h6>AssignedTo: { this.state.user.assignedTo && this.state.user.assignedTo.length }</h6>
                      <h6>Comments: { this.state.user.comments && this.state.user.comments.length }</h6>
                    </Container>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="projects" title="Projects">
                <Container fluid className="comments">
                  <Row className="project-issues">
                    {
                      this.state.user.projects &&
                      <Table responsive className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Issues</th>
                            <th>Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.user.projects &&
                            this.state.user.projects.map((project, index) =>
                              <UserProjects
                                key = { index }
                                id = { project._id }
                                image = { project.image }
                                name = { project.name }
                                description = {project.description}
                                issues = { project.issues.length }
                                created= {project.relativeDate}
                              />
                            )
                          }
                        </tbody>
                      </Table>
                    }
                  </Row>
                </Container>
              </Tab>

              <Tab eventKey="issues" title="Issues">
                <Container fluid className="comments">
                  <Row className="project-issues">
                    {
                      this.state.user.issues &&
                      <Table responsive className="table">
                        <thead>
                          <tr>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>title</th>
                            <th>Project</th>
                            <th>Followers</th>
                            <th>Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.user.issues &&
                            this.state.user.issues.map((issue, index) =>
                              <UserIssues
                                key = { index }
                                id = { issue._id }
                                priority = { issue.priority }
                                status = { issue.status }
                                title = { issue.title }
                                followers = {issue.followers.length}
                                project = { issue.project.name }
                                created= {issue.relativeDate}
                              />
                            )
                          }
                        </tbody>
                      </Table>
                    }
                  </Row>
                </Container>
              </Tab>

              <Tab eventKey="comments" title="Comments">
                <Container fluid className="comments">
                  <Row className="project-issues">
                    {
                      this.state.user.comments &&
                      <Table responsive className="table">
                        <thead>
                          <tr>
                            <th>Issue</th>
                            <th>Comment</th>
                            <th>Posted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.user.comments &&
                            this.state.user.comments.map((comment, index) =>
                              <UserComments
                                key = { index }
                                id = { comment._id }
                                issueId = { comment.issue._id }
                                issue = { comment.issue.title }
                                comment = {comment.content}
                                posted = { comment.relativeDate }
                              />
                            )
                          }
                        </tbody>
                      </Table>
                    }
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default withAuth(ViewUser);
