import React, { useContext } from "react"; // Import React and useContext hook
import { Link } from "react-router-dom"; // Import Link for navigation
import { BookContext } from "../context/BookContext"; // Import BookContext to access writers data
import { Card, ListGroup } from "react-bootstrap"; // Import Bootstrap components for Card and ListGroup styling

// WritersList component displays a list of writers with links to filter books by writer
const WritersList = () => {
  const { writers } = useContext(BookContext); // Access writers array from BookContext

  return (
    <Card>
      <Card.Header as="h4">Writers</Card.Header>{" "}
      {/* Card header displaying "Writers" */}
      <ListGroup variant="flush">
        {" "}
        {/* ListGroup with flush style for seamless appearance */}
        {/* Map over writers array to create a list item for each writer */}
        {writers.map((writer) => (
          <ListGroup.Item key={writer.id}>
            {" "}
            {/* Each writer is a ListGroup.Item */}
            <Link to={`/book?writer=${writer.id}`}>{writer.name}</Link>{" "}
            {/* Link to filter books by writer ID */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default WritersList;
