import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import {
  Form,
  Button,
  Alert,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const AddCharactersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, characters, setBooks } = useContext(BookContext);
  const book = books.find((m) => m.id === parseInt(id));
  const [selectedCharacters, setSelectedCharacters] = useState(
    book ? book.characters : []
  );
  const [message, setMessage] = useState("");

  const handleCharacterToggle = (characterId) => {
    setSelectedCharacters((prevState) =>
      prevState.includes(characterId)
        ? prevState.filter((id) => id !== characterId)
        : [...prevState, characterId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = { ...book, characters: selectedCharacters };
      await axios.patch(`${BASE_URL}/books/${id}`, {
        characters: selectedCharacters,
      });
      setBooks((prevBooks) =>
        prevBooks.map((m) => (m.id === book.id ? updatedBook : m))
      );
      setMessage("Characters added successfully");
      setTimeout(() => {
        setMessage("");
        navigate("/book");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-5">
            <Card.Header as="h3">Add characters to the book</Card.Header>
            <Card.Body>
              <Card.Title>Book title: {book.title}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="d-flex flex-wrap">
                  {characters.map((character) => (
                    <Form.Check
                      key={character.id}
                      type="checkbox"
                      label={character.fullname}
                      checked={selectedCharacters.includes(character.id)}
                      onChange={() => handleCharacterToggle(character.id)}
                      className="mb-2 mr-3"
                    />
                  ))}
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                  Add Characters
                </Button>
              </Form>
              {message && (
                <Alert variant="success" className="mt-3">
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCharactersPage;
