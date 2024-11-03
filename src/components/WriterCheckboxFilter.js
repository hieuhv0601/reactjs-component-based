import React, { useContext, useEffect } from "react";
import { Card, ListGroup, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { BookContext } from "../context/BookContext";

const WriterCheckboxFilter = () => {
  const { writers, handleWritersSelect, selectedWriters } =
    useContext(BookContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize selected writers from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const writerParam = params.get("writers");
    if (writerParam) {
      const writerIds = writerParam.split(",").map(Number);
      handleWritersSelect(writerIds);
    }
  }, [location.search, handleWritersSelect]);

  const handleWriterToggle = (writerId) => {
    const newSelected = new Set(selectedWriters);

    if (newSelected.has(writerId)) {
      newSelected.delete(writerId);
    } else {
      newSelected.add(writerId);
    }

    // Update context with new selection
    handleWritersSelect(Array.from(newSelected));

    // Update URL
    if (newSelected.size === 0) {
      navigate("/book");
    } else {
      const writerParams = Array.from(newSelected).join(",");
      navigate(`/book?writers=${writerParams}`);
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Writers Selection</h4>
        {selectedWriters.size > 0 && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              handleWritersSelect([]);
              navigate("/book");
            }}
          >
            Clear All
          </button>
        )}
      </Card.Header>
      <ListGroup variant="flush">
        {writers.map((writer) => (
          <ListGroup.Item key={writer.id}>
            <Form.Check
              type="checkbox"
              id={`writer-${writer.id}`}
              label={writer.name}
              checked={selectedWriters.has(writer.id)}
              onChange={() => handleWriterToggle(writer.id)}
              className="d-flex align-items-center gap-2"
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default WriterCheckboxFilter;
