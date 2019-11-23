import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import issues from '../../lib/issue-service';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Breadcrumb,
  Container,
  Modal
} from 'react-bootstrap';

class CommentIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: this.props.match.params.id,
      issueDetails: '',
      content: '',
      errors: ''
    };
  }

  componentDidMount = () => {
    // Call issue details API
    const { id } = this.props.match.params;
    issues.details(id).then(
      response => {
        const issue = response.data;
        this.setState({
          issueDetails: issue
        });
      }
    ).catch(error => console.log(error));
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      issue,
      content
    } = this.state;

    await issues.comment({
      issue,
      content
    });

    this.setState({
      content: ''
    });
    this.props.history.push('/issues/' + this.state.issue);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const {
      content,
      errors
    } = this.state;

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to = "/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to = "/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
    <LinkContainer to = {'/issues/' + this.props.match.params.id}><Breadcrumb.Item>{this.state.issueDetails.title}</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Post Comment</Breadcrumb.Item>
        </Breadcrumb>
        
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Post Comment</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit = { this.handleFormSubmit } id="comment">
              <Form.Group controlId = "content" >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as = "textarea"
                  rows = "10"
                  name = "content"
                  value = { content }
                  onChange = { this.handleChange }
                  required
                />
              </Form.Group>

              {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <LinkContainer to={'/issues/' + this.props.match.params.id}><Button variant="primary" size="sm">Cancel</Button></LinkContainer>
            <Button variant="upshot" size="sm" type="submit" form="comment" disabled={!content}>Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Container>
    );
  }
}

export default withAuth(CommentIssue);
