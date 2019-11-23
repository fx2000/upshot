import React, { useState } from "react";

// Bootstrap Components
import {
  Modal,
  Button,
  Image
} from 'react-bootstrap';

const Attachments = (props) => {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);

  return (
    <>
      <img src={props.attachment} alt="Attachment" onClick={handleShow} />

      <Modal
        size="md"
        show={lgShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={props.attachment} alt="Attachment" onClick={handleShow} fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Attachments;
