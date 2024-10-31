import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { db } from './firebase';

function EditNoodleModal({ id, title, price, updateNoodles }) { // Destructure updateNoodles
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editNoodle = () => {
    db.collection("Noodle").doc(id).set({
      name: newTitle,
      price: newPrice
    }, { merge: true })  // merges the changes with the existing document
    .then(() => {
      alert("Noodle successfully updated!");
      handleClose();
      updateNoodles(); // Update noodles list
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <div>
      <button onClick={handleShow}>Edit</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Noodle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNoodleName">
              <Form.Label>Noodle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Noodle Name" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formNoodlePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editNoodle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditNoodleModal;
