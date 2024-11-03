// CreateBook.js
import React, { useState, useContext } from "react"; // Import necessary hooks from React
import { Form, Button, Container } from "react-bootstrap"; // Import Bootstrap components for form styling
import { BookContext } from "../context/BookContext"; // Import BookContext to access shared data
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../utils/api"; // Import the API base URL
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

const CreateBook = () => {
  const { setBooks, writers, editors } = useContext(BookContext); // Use BookContext to access writers, editors, and setBooks function
  const navigate = useNavigate(); // Initialize navigation function
  const [formData, setFormData] = useState({
    title: "",
    release: "",
    description: "",
    writer: "",
    editor: "",
    genres: [],
    characters: [],
  }); // State to hold form data with initial empty values

  // Handle input change for text fields, updating formData state
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle genre input, splitting comma-separated string into an array of genres
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      genres: value.split(",").map((genre) => genre.trim()), // Split and trim each genre
    }));
  };

  // Handle form submission, sending a POST request to create a new book
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const newBook = {
        ...formData,
        writer: Number(formData.writer), // Convert writer and editor IDs to numbers
        editor: Number(formData.editor),
      };
      const response = await axios.post(`${BASE_URL}/books`, newBook); // Send POST request to add the new book
      setBooks((prevBooks) => [...prevBooks, response.data]); // Update book list in context with the new book
      navigate("/book"); // Redirect to the book list page
    } catch (error) {
      console.error(error); // Log error if request fails
    }
  };

  return (
    <Container>
      <h2 className="my-4">Create New Book</h2> {/* Page header */}
      <Form onSubmit={handleSubmit}>
        {" "}
        {/* Form submission handled by handleSubmit */}
        <Form.Group controlId="formBookTitle">
          {" "}
          {/* Input for book title */}
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
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
            required
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
            required
          />
        </Form.Group>
        <Form.Group controlId="formBookWriter">
          {" "}
          {/* Dropdown to select writer */}
          <Form.Label>Writer</Form.Label>
          <Form.Control
            as="select"
            name="writer"
            value={formData.writer}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Writer</option>
            {writers.map(
              (
                writer // Map writers to options
              ) => (
                <option key={writer.id} value={writer.id}>
                  {writer.name}
                </option>
              )
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBookEditor">
          {" "}
          {/* Dropdown to select editor */}
          <Form.Label>Editor</Form.Label>
          <Form.Control
            as="select"
            name="editor"
            value={formData.editor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an Editor</option>
            {editors.map(
              (
                editor // Map editors to options
              ) => (
                <option key={editor.id} value={editor.id}>
                  {editor.fullname}
                </option>
              )
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBookGenres">
          {" "}
          {/* Input for genres, as comma-separated values */}
          <Form.Label>Genres (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="genres"
            value={formData.genres.join(", ")} // Display genres as comma-separated
            onChange={handleGenreChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          {/* Submit button */}
          Create Book
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBook;
