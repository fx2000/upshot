import React, { Component } from 'react';
import projects from '../../lib/project-service';
import ProjectListItem from '../../components/project/ProjectListItem';
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

class Projects extends Component {
  constructor () {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount () {
    // Call projects list API
    projects.list().then(
      response => {
        const projects = response.data;
        if (projects.length > 0) {
          this.setState({ projects });
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
            <Breadcrumb.Item active>Projects</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Projects</h2>
        </Row>
        <Row>
          <Link to="/projects/create">Create Project</Link>
        </Row>
        <Row>
          <Table responsive className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Issues</th>
                <th>Creator</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.projects.map((project, index) =>
                  <ProjectListItem
                    key = { index }
                    id = { project._id }
                    name = { project.name }
                    image = { project.image }
                    description = { project.description }
                    creatorName = { project.creator.firstName + ' ' + project.creator.lastName}
                    creatorId = { project.creator._id }
                    issues = {project.issues.length}
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

export default withAuth(Projects);
