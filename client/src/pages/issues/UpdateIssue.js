import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import issues from '../../lib/issue-service';
import projects from '../../lib/project-service';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from "react-firebase-file-uploader";

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Breadcrumb,
  Container,
  Row,
  Modal
} from 'react-bootstrap';

class UpdateIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: '',
      content: '',
      project: '',
      priority: '',
      filenames: [],
      attachments: [],
      isUploading: false,
      uploadProgress: 0,
      status: '',
      errors: '',
      projects: []
    };
  }

  // Form submit handler
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      id,
      title,
      content,
      project,
      priority,
      status,
      attachments
    } = this.state;

    await issues.update({
      id,
      title,
      content,
      project,
      priority,
      status,
      attachments
    });

    this.setState({
      title: '',
      content: '',
      project: '',
      priority: '',
      status: '',
      attachments: ''
    });
    this.props.history.push('/issues/' + this.state.id);
  }

  // Form change handler
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Upload file handler
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  // Upload progress handler
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  // Upload error handler
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  };

  // Upload success handler
  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
 
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      attachments: [...oldState.attachments, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  componentDidMount = () => {
    // Get Projects
    projects.list().then(
      response => {
        const projects = response.data;
        if (projects.length > 0) {
          this.setState({ projects });
        }
      }
    ).catch(error => console.log(error));

    // Get issue data
    const { id } = this.props.match.params;
    issues.details(id).then(
      response => {
        const issue = response.data;
        this.setState({
          title: issue.title,
          content: issue.content,
          project: issue.project,
          priority: issue.priority,
          status: issue.status
        });
      }
    ).catch(error => console.log(error));
  }

  render () {
    const {
      title,
      content,
      project,
      priority,
      status,
      errors
    } = this.state;

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
          <LinkContainer to={'/issues/' + this.state.id}><Breadcrumb.Item>{this.state.title}</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Update Issue</Breadcrumb.Item>
        </Breadcrumb>


        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Update Issue</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit} id="updateIssue">
              <Form.Group controlId="title" >
                <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>

                { /* TODO: Add markdown support or a rich text editor */ }
                <Form.Group controlId="content" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="6"
                    name="content"
                    value={content}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="project">
                  <Form.Label>Project</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="project" value={project._id} required>
                    {
                      this.state.projects && this.state.projects.map(project => (
                        <option value={project._id} key={project._id}>{project.name}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId = "priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="priority" value={priority}required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="status" value={status} required>
                    <option value = "Open">Open</option>
                    <option value = "Closed">Closed</option>
                    <option value = "Re-Opened">Re-Opened</option>
                  </Form.Control>
                </Form.Group>
                
                <label style = {
                  {
                    backgroundColor: 'steelblue',
                    color: 'white',
                    padding: 10,
                    borderRadius: 4,
                    cursor: 'pointer'
                  }
                }>Add attachments
                  <FileUploader
                    hidden
                    accept="image/*"
                    name="image-uploader-multiple"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    multiple
                  />
                </label>
                <Container>
                  <Row>
                    {this.state.attachments.map((downloadURL, i) => {
                      return <img
                        key={i}
                        alt = "Attachment"
                        src = {downloadURL}
                        width = "auto"
                        height = "100"
                        className = "d-inline-block align-top" />
                    })}
                  </Row>
                </Container>

                {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <LinkContainer to={'/issues/' + this.state.id}><Button variant="primary" size="sm">Cancel</Button></LinkContainer>
            <Button variant="upshot" size="sm" type="submit" form="updateIssue">Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Container>
    );
  }
}

export default withAuth(UpdateIssue);
