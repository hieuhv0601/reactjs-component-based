// BookTable.js
import React, { useContext, useState } from "react"; // Import necessary hooks from React
import { Link } from "react-router-dom"; // Import Link component for navigation
import { BookContext } from "../context/BookContext"; // Import context for accessing shared book data
import { Table, Button } from "react-bootstrap"; // Import Bootstrap components for table and buttons
import EditBookModal from "./EditBookModal"; // Import EditBookModal component for editing books
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../utils/api"; // Import BASE_URL for API endpoint

const BookTable = () => {
  // Destructure data from BookContext to access shared data and state updater function
  const { books, writers, editors, characters, setBooks } =
    useContext(BookContext);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book for editing

  // Helper function to get writer's name by ID
  const getWriterName = (id) => {
    const writer = writers.find((p) => p.id === id);
    return writer ? writer.name : "Unknown";
  };

  // Helper function to get editor's name by ID
  const getEditorName = (id) => {
    const editor = editors.find((d) => d.id === id);
    return editor ? editor.fullname : "Unknown";
  };

  // Helper function to get character names by IDs and display them as a list
  const getCharacterNames = (characterIds) => {
    return (
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {characterIds.map((id, index) => {
          const character = characters.find((s) => s.id === id);
          return (
            <li key={id}>{`${index + 1}. ${
              character ? character.fullname : "Unknown"
            }`}</li>
          );
        })}
      </ul>
    );
  };

  // Helper function to format date in "dd/mm/yyyy" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  // Function to handle the edit button click; sets the selected book and opens the modal
  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  // Function to handle the delete button click; confirms deletion, sends delete request, and updates state
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/books/${bookId}`); // Delete request to remove book
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Update state
      } catch (error) {
        console.error(error); // Log error if deletion fails
      }
    }
  };

  return (
    <>
      <Table striped bordered hover className="mt-3">
        {" "}
        {/* Bootstrap table styling */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Release</th>
            <th>Description</th>
            <th>Writer</th>
            <th>Editor</th>
            <th>Genres</th>
            <th>Characters</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over books array to display each book's data in a row */}
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{formatDate(book.release)}</td>{" "}
              {/* Display formatted release date */}
              <td>{book.description}</td>
              <td>
                <Link to={`/book?writer=${book.writer}`}>
                  {getWriterName(book.writer)}
                </Link>
                {/* Link to filter books by writer */}
              </td>
              <td>
                <Link to={`/book?editor=${book.editor}`}>
                  {getEditorName(book.editor)}
                </Link>
                {/* Link to filter books by editor */}
              </td>
              <td>{book.genres.join(", ")}</td>{" "}
              {/* Display genres as comma-separated list */}
              <td className="characters-column">
                {getCharacterNames(book.characters)}{" "}
                {/* Display characters in list format */}
                <Link to={`/book/${book.id}/add-characters`}>
                  Add characters
                </Link>
                {/* Link to add more characters to the book */}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </Button>{" "}
                {/* Edit button triggers handleEdit */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>{" "}
                {/* Delete button triggers handleDelete */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Conditionally render EditBookModal when a book is selected */}
      {selectedBook && (
        <EditBookModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal on close
          book={selectedBook} // Pass selected book as prop to EditBookModal
        />
      )}
    </>
  );
};

export default BookTable;
