import React, { Component } from 'react';
import issues from '../../lib/issue-service';
import users from '../../lib/user-service';
import { withAuth } from '../../lib/AuthProvider';
import { LinkContainer } from 'react-router-bootstrap';
import IssueComments from '../../components/issue/IssueComments';
import Attachments from '../../components/issue/Attachments';

// Bootstrap Components
import {
  Tabs,
  Tab,
  Breadcrumb,
  Container,
  Row,
  Button,
  ButtonGroup
} from 'react-bootstrap';

class ViewIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: '',
      update: '',
      following: '',
      assigned: '',
      user: ''
    };
  }

  componentDidMount = async () => {
    // Call issue details API
    const { id } = this.props.match.params;
    await issues.details(id).then(
      response => {
        const issue = response.data;
        this.setState({
          issue: issue
        });
      }
    ).catch(error => console.log(error));

    // Call user details API
    const userId = this.props.user._id;
    await users.details(userId).then(
      response => {
        const user = response.data;
        this.setState({
          user: user
        });
      }
    ).catch(error => console.log(error));

    // Set state according to user's access to this issue
    if (this.state.issue.creator._id === this.state.user._id) {
      this.setState({
        update: true
      });
    }
    this.state.user.following.forEach(issue => {
      if (issue._id === this.state.issue._id) {
        this.setState({
          following: true
        });
      }
    });
    this.state.user.assignedTo.forEach(issue => {
      if (issue._id === this.state.issue._id) {
        this.setState({
          assigned: true
        });
      }
    });
  }

  // Call follow issue API
  followIssue = async () => {
    const id = this.state.issue._id;
    await issues.follow({
      id
    });
    this.setState(toggle => ({
      following: !toggle.following
    }));
  }

  // Call unfollow issue API
  unfollowIssue = async () => {
    const id = this.state.issue._id;
    await issues.unfollow({
      id
    });
    this.setState(toggle => ({
      following: !toggle.following
    }));
  }

  // Call takeover issue API
  takeoverIssue = async () => {
    const id = this.state.issue._id;
    await issues.takeover({
      id
    });
    this.setState(toggle => ({
      assigned: !toggle.assigned
    }));
  }

  // Call release issue API
  releaseIssue = async () => {
    const id = this.state.issue._id;
    await issues.release({
      id
    });
    this.setState(toggle => ({
      assigned: !toggle.assigned
    }));
  }

  render = () => {   
    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Issue Details</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="controls">
          {/* Render buttons according to user's profile */}
          <h2>{this.state.issue.title}</h2>

          <ButtonGroup aria-label="Actions">
            {
              // TODO: Add a confirmation message before deleting a record
              this.state.issue && this.state.update ?
                <Button variant="danger" onClick={() => issues.delete(this.props.match.params.id)}>Delete</Button> : null
            }
            {
              this.state.issue && this.state.update ?
                <LinkContainer to={'/issues/' + this.state.issue._id + '/update'}><Button variant="upshot">Update</Button></LinkContainer> : null
            }
            {
              this.state.issue && this.state.following ?
                <Button onClick={this.unfollowIssue} variant="upshot">Unfollow</Button> : <Button onClick={this.followIssue} variant="upshot">Follow</Button>
            }
            {
              this.state.issue && this.state.assigned ?
                <Button onClick={this.releaseIssue} variant="upshot">Release</Button> : <Button onClick={this.takeoverIssue} variant="upshot">Takeover</Button>
            }
          </ButtonGroup>
          
        </Row>
        <Row>
          <Container fluid>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="details">
              <Tab eventKey="details" title="Details">
                <Container fluid className="issue-details">
                  <Row>
                    {this.state.issue.content}
                  </Row>
                  <Row>
                    <Container className="attachments">
                      {
                        this.state.issue.attachments &&
                        this.state.issue.attachments.map((attachment, index) =>
                          <Attachments
                            key = { index }
                            attachment = { attachment }
                          />
                        )
                      }
                    </Container>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="comments" title="Comments">
                <Container fluid className="issue-details">
                  <Row>
                    <LinkContainer to={'/issues/' + this.state.issue._id + '/comment'}>
                      <Button variant="upshot">Post New Comment</Button>
                    </LinkContainer>
                  </Row>
                  <Row>
                    <Container fluid className="comments">
                      {
                        this.state.issue.comments &&
                        this.state.issue.comments.map((comment, index) =>
                          <IssueComments
                            key = { index }
                            id = { comment._id }
                            commenterId = { comment.user._id }
                            commenterName = { comment.user.firstName + ' ' + comment.user.lastName}
                            avatar = { comment.user.avatar }
                            content = { comment.content }
                            created = { comment.relativeDate }
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
