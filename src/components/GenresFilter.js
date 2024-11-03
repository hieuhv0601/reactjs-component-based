import React, { useContext } from "react"; // Import React and useContext hook
import { Link } from "react-router-dom"; // Import Link for client-side navigation
import { BookContext } from "../context/BookContext"; // Import BookContext to access genres data
import { Navbar, Nav } from "react-bootstrap"; // Import Bootstrap components for Navbar

// GenresFilter component provides a navigation bar to filter books by genre
const GenresFilter = () => {
  const { genres } = useContext(BookContext); // Access genres array from BookContext

  return (
    <Navbar bg="light" variant="light" className="justify-content-center">
      <Nav>
        {/* Link to display all books */}
        <Nav.Item>
          <Nav.Link as={Link} to="/book">
            Show all books
          </Nav.Link>
        </Nav.Item>
        {/* Map over genres array to create a link for each genre */}
        {genres.map((genre) => (
          <Nav.Item key={genre}>
            {" "}
            {/* Unique key for each genre */}
            <Nav.Link as={Link} to={`/book?genre=${genre}`}>
              {genre} {/* Display genre name as link text */}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  );
};

export default GenresFilter;
