import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import AddCharactersPage from "./pages/AddCharactersPage";
import BookProvider from "./context/BookContext";
import EditBookForm from "./pages/EditBookForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateBook from "./pages/CreateBook";

function App() {
  return (
    <BookProvider>
      <Router>
        <Routes>
          <Route path="/book" element={<BooksPage />} />
          <Route
            path="/book/:id/add-characters"
            element={<AddCharactersPage />}
          />
          <Route path="/book/:id/edit" element={<EditBookForm />} />
          <Route path="/book/create" element={<CreateBook />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
