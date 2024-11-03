import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const EditBookForm = () => {
  const { books, setBooks } = useContext(BookContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: book ? book.title : "",
    release: book ? book.release : "",
    description: book ? book.description : "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = { ...book, ...formData };
      await axios.put(`${BASE_URL}/books/${id}`, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
      );
      navigate("/book");
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <Container>
      <h2 className="my-4">Edit Book</h2>
      <Form onSubmit={handleSaveChanges}>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBookRelease">
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type="date"
            name="release"
            value={formData.release}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBookDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditBookForm;
