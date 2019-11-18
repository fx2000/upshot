import React, { Component } from 'react';
import projects from '../../lib/project-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import ProjectIssues from '../../components/project/ProjectIssues';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row
} from 'react-bootstrap';

class ViewProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      project: {}
    };
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    projects.details(id).then(
      response => {
        const project = response.data;
        this.setState({
          project: project
        });
        console.log(this.state.project)
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
              </Tab>
            </Tabs>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default withAuth(ViewProject);
