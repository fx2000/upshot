import React, { Component } from 'react';
import projects from '../../lib/project-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import ProjectIssues from '../../components/project/ProjectIssues';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button
} from 'react-bootstrap';

class ViewProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      project: {}
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
    return (
      <Container fluid={true}>
        <Row>
          <Breadcrumb>
            <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to="/projects"><Breadcrumb.Item>Projects</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Project Details</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>{this.state.project.name}</h2>
        </Row>
        <Row>
          <Link to={ '/projects/' + this.state.project._id + '/update' }>Update Project</Link>
        </Row>
        <Row>
          <Container fluid={true}>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid={true} className="project-details">
                  <Row>
                    <img src={this.state.project.image} alt={this.state.project.name} className="project-image"/>
                  </Row>
                  <Row>
                    <ul>
                      <li>Creator: {
                        this.state.project.creator && this.state.project.creator.firstName + ' ' + this.state.project.creator.lastName
                      }</li>
                      <li>Creation Date: { this.state.project.createdAt }</li>
                      <li>Issues: { this.state.project.issues && this.state.project.issues.length }</li>
                    </ul>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="issues" title="Issues">
                <Container fluid = { true } className="comments">
                  <Row>
                    <LinkContainer to = { '/issues/create' }>
                      <Button>Create New Issue</Button>
                    </LinkContainer>
                  </Row>
                  <Row>
                    <ul>
                      {
                        this.state.project.issues && this.state.project.issues.map((issue, index) =>
                          <ProjectIssues
                            id = { issue._id }
                            key = { index }
                            title = { issue.title }
                          />
                        )
                      }
                    </ul>
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
