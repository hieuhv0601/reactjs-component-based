import React, { useState, useContext } from "react"; // Import React and necessary hooks
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components for modal and form styling
import { BookContext } from "../context/BookContext"; // Import BookContext to access shared book data
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../utils/api"; // Import API base URL

const EditBookModal = ({ show, handleClose, book }) => {
  const { setBooks } = useContext(BookContext); // Access setBooks from BookContext to update book list
  const [formData, setFormData] = useState({
    title: book.title,
    release: book.release,
    description: book.description,
  }); // Initialize form data state with existing book details

  // Handle input changes for form fields, updating formData state
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save changes by sending an update request to the server and updating the book list in context
  const handleSaveChanges = async () => {
    try {
      const updatedBook = { ...book, ...formData }; // Merge original book data with updated form data
      await axios.put(`${BASE_URL}/books/${book.id}`, updatedBook); // Send PUT request to update book on server
      setBooks(
        (prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? updatedBook : b)) // Update state with modified book
      );
      handleClose(); // Close modal after saving changes
    } catch (error) {
      console.error(error); // Log error if the update fails
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {" "}
      {/* Modal visibility controlled by show prop */}
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title> {/* Modal title */}
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookTitle">
            {" "}
            {/* Input for book title */}
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBookRelease">
            {" "}
            {/* Input for release date */}
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="release"
              value={formData.release}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBookDescription">
            {" "}
            {/* Input for description */}
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {" "}
          {/* Cancel button to close modal */}
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {" "}
          {/* Save changes button to submit updated data */}
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
