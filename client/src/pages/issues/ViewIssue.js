import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import IssueComments from '../../components/issue/IssueComments';
import { Link } from 'react-router-dom';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button
} from 'react-bootstrap';

class ViewIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: ''
    };
  }

  componentDidMount = () => {
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

  // Call follow issue API
  followIssue = () => {
    const id = this.state.issue._id;
    issues.follow({
      id
    });
  }

  // Call unfollow issue API
  unfollowIssue = () => {
    const id = this.state.issue._id;
    issues.unfollow({
      id
    });
  }

  // Call takeover issue API
  takeoverIssue = () => {
    const id = this.state.issue._id;
    issues.takeover({
      id
    });
  }

  // Call release issue API
  releaseIssue = () => {
    const id = this.state.issue._id;
    issues.release({
      id
    });
  }

  render = () => {
    // Check user properties to define button rendering
    let update = false;
    let following = false;
    let assigned = false;
    if (this.state.issue) {
      if (this.props.user._id === this.state.issue.creator._id) { update = true }

      this.props.user.following.forEach(issue => {
        if (issue._id === this.state.issue._id) { following = true }
      });

      this.props.user.assignedTo.forEach(issue => {
        if (issue._id === this.state.issue._id) { assigned = true }
      });
    }
    
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
        {/* Render buttons according to user's profile */}
        <Row>
          {
            this.state.issue && update ?
              <LinkContainer to={'/issues/' + this.state.issue._id + '/update'}><Button>Update</Button></LinkContainer> : null
          }
          {
            this.state.issue && following ?
              <Button onClick={this.unfollowIssue}>Unfollow</Button> : <Button onClick={this.followIssue}>Follow</Button>
          }
          {
            this.state.issue && assigned ?
              <Button onClick={this.releaseIssue}>Release</Button> : <Button onClick={this.takeoverIssue}>Takeover</Button>
          }
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
                <Container fluid={true} className="issue-details">
                  <Row>
                    <LinkContainer to={'/issues/' + this.state.issue._id + '/comment'}>
                      <Button>Post New Comment</Button>
                    </LinkContainer>
                  </Row>
                  <Row>
                    <Container fluid={true} className="comments">
                      {
                        this.state.issue.comments && this.state.issue.comments.map((comment, index) =>
                          <IssueComments
                            key = { index }
                            id = { comment._id }
                            commenterId = { comment.user._id }
                            commenterName = { comment.user.firstName + ' ' + comment.user.lastName}
                            avatar = { comment.user.avatar }
                            content = { comment.content }
                          />
                        )
                      }
                    </Container>
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

export default withAuth(ViewIssue);
