import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { db, firebase } from './firebase'; // Import firebase here

function AddNoodleButton({ updateNoodles }) { // Destructure updateNoodles from props
  const [show, setShow] = useState(false);
  const [noodleName, setNoodleName] = useState('');
  const [noodlePrice, setNoodlePrice] = useState('');
  const [noodleImage, setNoodleImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFileChange = (e) => {
    setNoodleImage(e.target.files[0]);
  };

  const addNoodle = async () => {
    if (noodleImage) {
      const storageRef = firebase.storage().ref(`/noodles/${noodleImage.name}`);
      const uploadTask = storageRef.put(noodleImage);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => { },
        error => {
          console.error(error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

          db.collection("Noodle").add({
            name: noodleName,
            price: noodlePrice,
            img: downloadURL
          })
            .then(() => {
              alert("Noodle successfully added!");
              handleClose();
              updateNoodles(); // update noodles list
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      );
    } else {
      alert('Please select an image for the noodle.');
    }
  }

  return (
    <div className='noodle addNoodle' onClick={handleShow}>
      <h2>+</h2> {/* This is the + sign */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Noodle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNoodleName">
              <Form.Label>Noodle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Noodle Name" value={noodleName} onChange={(e) => setNoodleName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formNoodlePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" value={noodlePrice} onChange={(e) => setNoodlePrice(Number(e.target.value))} />
            </Form.Group>


            <Form.Group>
              <Form.Label>Noodle Image</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNoodle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNoodleButton;
