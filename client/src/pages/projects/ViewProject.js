import React, { Component } from 'react';
import projects from '../../lib/project-service';
import { withAuth } from '../../lib/AuthProvider';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import ProjectIssues from '../../components/project/ProjectIssues';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button,
  Table,
  ButtonGroup
} from 'react-bootstrap';

class ViewProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      project: ''
    };
  }

  componentDidMount () {
    // Call project details API
    const { id } = this.props.match.params;
    projects.details(id).then(
      response => {
        const project = response.data;
        this.setState({
          project: project
        });
      }
    ).catch(error => console.log(error));
  }

  render () {
    // Check user properties to define button rendering
    let update = false;
    if (this.state.project) {
      if (this.props.user._id === this.state.project.creator._id) {
        update = true;
      }
    }

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/projects"><Breadcrumb.Item>Projects</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Project Details</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          <h2>{this.state.project.name}</h2>
          <ButtonGroup aria-label="Actions">
            {
              this.state.project && update ?
                <LinkContainer to={'/projects/' + this.state.project._id + '/update'}><Button variant="upshot">Update</Button></LinkContainer> : null
            }
            {
              // TODO: Add a confirmation message before deleting a record
              this.state.project && update ?
                <Button variant="danger" onClick={() => projects.delete(this.props.match.params.id)}>Delete</Button> : null
            }
          </ButtonGroup>
        </Row>
        <Row>
          <Container fluid>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid className="project-details">
                  <Row>
                    <img src={this.state.project.image} alt={this.state.project.name} className="project-image"/>
                  </Row>
                  <Row>
                    <Container>
                      <h5>Created { this.state.project.relativeDate } by {
                        this.state.project.creator &&
                        <Link to={'/users/' + this.state.project.creator._id}>{this.state.project.creator.firstName + ' ' + this.state.project.creator.lastName}</Link>
                      }
                      </h5>
                      <h6>Issues: { this.state.project.issues && this.state.project.issues.length }</h6>
                      <p>{ this.state.project.description }</p>
                    </Container>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="issues" title="Issues">
                <Container fluid className="comments">
                  <Row>
                    <LinkContainer to = { '/issues/create/' + this.state.project._id }>
                      <Button variant="upshot">Create New Issue</Button>
                    </LinkContainer>
                  </Row>
                  <Row className="project-issues">
                    {
                      this.state.project.issues &&
                      <Table responsive className="table">
                        <thead>
                          <tr>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Creator</th>
                            <th>Followers</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.project.issues &&
                            this.state.project.issues.map((issue, index) =>
                              <ProjectIssues
                                key = { index }
                                id = { issue._id }
                                priority = { issue.priority }
                                status = {issue.status}
                                title = { issue.title }
                                description = { issue.content }
                                creatorId = { issue.creator._id }
                                creatorName = { issue.creator.firstName + ' ' + issue.creator.lastName}
                                followers = { issue.followers.length }
                                comments = { issue.comments.length }
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

export default withAuth(ViewProject);
