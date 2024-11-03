import React, { createContext, useState, useEffect } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../utils/api"; // Import API base URL

export const BookContext = createContext(); // Create BookContext to share data globally

// BookProvider component wraps child components and provides book-related data and functionality
const BookProvider = ({ children }) => {
  // State variables for books, writers, editors, characters, genres, filters, and search query
  const [selectedWriters, setSelectedWriters] = useState(new Set());
  const [books, setBooks] = useState([]);
  const [writers, setWriters] = useState([]);
  const [editors, setEditors] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedEditor, setSelectedEditor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books, writers, editors, and characters data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, writersData, editorsData, charactersData] =
          await Promise.all([
            axios.get(`${BASE_URL}/books`),
            axios.get(`${BASE_URL}/writers`),
            axios.get(`${BASE_URL}/editors`),
            axios.get(`${BASE_URL}/characters`),
          ]);
        setBooks(booksData.data);
        setWriters(writersData.data);
        setEditors(editorsData.data);
        setCharacters(charactersData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Extract unique genres from books data whenever books change
  useEffect(() => {
    const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))];
    setGenres(uniqueGenres);
  }, [books]);

  // Handle selection of genre, writer, or editor for filtering
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedWriter(null);
    setSelectedEditor(null);
  };

  const handleWritersSelect = (writerIds) => {
    setSelectedWriters(new Set(writerIds));
    setSelectedGenre(null);
    setSelectedEditor(null);
  };
  const handleWriterSelect = (writerId) => {
    setSelectedWriter(writerId);
    setSelectedGenre(null);
    setSelectedEditor(null);
  };

  const handleEditorSelect = (editorId) => {
    setSelectedEditor(editorId);
    setSelectedGenre(null);
    setSelectedWriter(null);
  };

  // Apply filters to books based on selected genre, writer, editor, and search query. ****For using Writer List
  const filteredBooks = books.filter((book) => {
    const genreFilter = !selectedGenre || book.genres.includes(selectedGenre);
    const writerFilter =
      selectedWriters.size === 0 || selectedWriters.has(book.writer);
    const editorFilter = !selectedEditor || book.editor === selectedEditor;
    const searchFilter =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase());

    return genreFilter && writerFilter && editorFilter && searchFilter;
  });

  return (
    <BookContext.Provider
      value={{
        books: filteredBooks,
        writers,
        editors,
        characters,
        genres,
        searchQuery,
        setSearchQuery,
        selectedWriters,
        handleWritersSelect,
        handleGenreSelect,
        selectedWriter,
        handleWriterSelect,
        handleEditorSelect,
        setBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
