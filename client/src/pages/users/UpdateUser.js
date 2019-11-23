import React, { Component } from 'react'
import { withAuth } from '../../lib/AuthProvider'
import users from '../../lib/user-service';
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
  Modal,
  Image
} from 'react-bootstrap';

class UpdateUser extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
      imageURL: '',
      progress: '',
      isUploading: '',
      errors: ''
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    users.details(id).then(
      response => {
        const user = response.data;
        this.setState({
          user: user,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    ).catch(error => console.log(error));
  }

  // Form submit handler
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      imageURL
    } = this.state;

    await users.update({
      id,
      firstName,
      lastName,
      email,
      password,
      imageURL
    });

    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    });
    this.props.history.push('/users/' + this.props.match.params.id);
  };

  // Form change handler
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Upload file handler
  handleUploadStart = () => this.setState({
    isUploading: true,
    progress: 0
  });

  // Upload progress handler
  handleProgress = progress => this.setState({
    progress
  });

  // Upload error handler
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.log(error);
  };

  // Upload success handler
  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("users")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({
        imageURL: url
      }));
  };

  render () {
    const {
      firstName,
      lastName,
      email,
      errors
    } = this.state;

    return (
      <Container fluid>
        <Breadcrumb>
          <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          <LinkContainer to="/users"><Breadcrumb.Item>Users</Breadcrumb.Item></LinkContainer>
          <LinkContainer to={'/users/' + this.props.match.params.id}><Breadcrumb.Item>{this.state.firstName + ' ' + this.state.lastName}</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Update User Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Update User Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Image src={this.state.user.avatar} alt="Avatar" fluid />
            </Container>
            <Container>
              { /* Display uploaded image */ }
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
              {
                this.state.imageURL &&
                  <img src={this.state.imageURL} alt="File upload" className="project-upload" />
              }
            </Container>
            <Form onSubmit={this.handleFormSubmit} id="updateUser">
              <Form.Group controlId = "firstName" >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              < Form.Group controlId = "lastName" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              < Form.Group controlId = "email" >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  autoComplete="email"
                  required
                />
              </Form.Group>

              {/* TODO: Enable password change
              <Form.Group controlId = "password" >
                <Form.Label>Enter a New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  autoComplete="new-password"
                />
              </Form.Group> */}

              <label style = {
                {
                  backgroundColor: 'steelblue',
                  color: 'white',
                  padding: 10,
                  borderRadius: 4,
                  cursor: 'pointer'
                }
              }>Upload a new Project Image
                <FileUploader
                  hidden
                  accept="image/*"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage().ref("users")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>

              {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <LinkContainer to={'/users/' + this.state.user._id}><Button variant="primary" size="sm">Cancel</Button></LinkContainer>
            <Button variant="primary" type="submit" form="updateUser" disabled={!firstName || !lastName || !email }>
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Container>
    )
  }
}

export default withAuth(UpdateUser);
