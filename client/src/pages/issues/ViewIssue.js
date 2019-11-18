import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row
} from 'react-bootstrap';

class ViewIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: {}
    };
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    issues.details(id).then(
      response => {
        const issue = response.data;
        this.setState({
          issue: issue
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
            <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Issue Details</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>{this.state.issue.title}</h2>
        </Row>
        <Row>
          <Container fluid={true}>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid={true} className="issue-details">
                  <Row>
                    {this.state.issue.content}
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="comments" title="Comments">
                TEST COMMENTS
              </Tab>
            </Tabs>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default withAuth(ViewIssue);
