import React, { Component } from 'react';
import projects from '../lib/project-service';
import Project from '../components/project/Project';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

class Projects extends Component {
  constructor () {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount () {
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
          <Link to="/create-project">Create Project</Link>
        </Row>
        <Row>
          <Table responsive className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Issues</th>
                <th>Creator</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.projects.map((project, index) =>
                  <Project
                    key = { index }
                    name = { project.name }
                    description = { project.description }
                    creator = { project.creator.firstName + ' ' + project.creator.lastName}
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
