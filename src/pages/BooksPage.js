// BooksPage.js
import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import WritersList from "../components/WritersList";
import GenresFilter from "../components/GenresFilter";
import BookTable from "../components/BookTable";
import SearchBar from "../components/SearchBar";
import { BookContext } from "../context/BookContext";
import WriterFilterByRatio from "../components/WriterFilterByRatio";
import WriterCheckboxFilter from "../components/WriterCheckboxFilter";

const BooksPage = () => {
  const { handleGenreSelect, handleWriterSelect, handleEditorSelect } =
    useContext(BookContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get("genre");
    const writer = params.get("writer");
    const editor = params.get("editor");

    if (genre) {
      handleGenreSelect(genre);
    } else if (writer) {
      handleWriterSelect(Number(writer));
    } else if (editor) {
      handleEditorSelect(Number(editor));
    } else {
      handleGenreSelect(null);
    }
  }, [
    location.search,
    handleGenreSelect,
    handleWriterSelect,
    handleEditorSelect,
  ]);

  return (
    <Container className="pt-4">
      <h1 className="mb-4 text-center">Book List</h1>
      <Row className="mb-3">
        <Col>
          <GenresFilter />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col md={3} className="pr-md-3">
          <WritersList />
          <WriterFilterByRatio />
          {/* <WriterCheckboxFilter /> */}
        </Col>
        <Col md={9} className="pl-md-3">
          <BookTable />
        </Col>
      </Row>
    </Container>
  );
};

export default BooksPage;
