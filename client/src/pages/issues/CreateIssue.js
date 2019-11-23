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

class CreateIssue extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      project: '',
      priority: '',
      filenames: [],
      attachments: [],
      isUploading: false,
      uploadProgress: 0,
      errors: '',
      projects: []
    };
  }

  // Form submit handler
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      title,
      content,
      project,
      priority,
      attachments
    } = this.state;

    await issues.create({
      title,
      content,
      project,
      priority,
      attachments
    });

    this.setState({
      title: '',
      content: '',
      project: '',
      priority: '',
      filenames: [],
      attachments: [],
      isUploading: false,
      uploadProgress: 0,
      errors: '',
      redirect: true
    });
    this.props.history.push('/issues');
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

  componentDidMount () {
    // Get Projects list
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
    const {
      title,
      content,
      errors
    } = this.state;

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Create Issue</Breadcrumb.Item>
        </Breadcrumb>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit} id="createIssue">
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
                  <Form.Control as="select" onChange={this.handleChange} name="project" value={this.props.match.params.id} required>
                      <option disabled selected value>Select Project</option>
                    {
                      this.state.projects &&
                      this.state.projects.map(project => (
                        <option value={project._id} key={project._id}>{project.name}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="priority" required>
                    <option disabled selected value>Select a Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
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
            <LinkContainer to="/issues"><Button variant="primary" size="sm">Cancel</Button></LinkContainer>
            <Button variant="upshot" size="sm" type="submit" form="createIssue" disabled={!title || !content}>Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Container>
      
    );
  }
}

export default withAuth(CreateIssue);
