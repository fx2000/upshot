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
  Row
} from 'react-bootstrap';

class CommentIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issue: this.props.match.params.id,
      content: '',
      errors: ''
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      issue,
      content
    } = this.state;

    issues.comment({
      issue,
      content
    });

    this.setState({
      content: ''
    });
    // TODO: Fix redirect so it refreshes
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
      <Container fluid = { true }>
        <Row>
          <Breadcrumb>
            <LinkContainer to = "/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to = "/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Post Comment</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Post Comment</h2>
        </Row>
        <Row>
          <Form onSubmit = { this.handleFormSubmit }>
            <Form.Group controlId = "content" >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type = "text"
                name = "content"
                value = { content }
                onChange = { this.handleChange }
                required
              />
            </Form.Group>

            {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}

            <Button variant="primary" type="submit" disabled = {!content}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withAuth(CommentIssue);
