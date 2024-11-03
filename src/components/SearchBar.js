import React, { useContext } from "react"; // Import React and useContext hook
import { FormControl } from "react-bootstrap"; // Import FormControl for input styling from Bootstrap
import { BookContext } from "../context/BookContext"; // Import BookContext to access search-related data

// SearchBar component allows the user to search books by title
const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(BookContext); // Access searchQuery and setSearchQuery from context

  // Update search query state whenever the input value changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <FormControl
      type="text"
      placeholder="Search by Title" // Placeholder text for the input
      value={searchQuery} // Bind input value to searchQuery from context
      onChange={handleSearchChange} // Call handleSearchChange on input change
      className="mb-3" // Bootstrap class to add margin below the input
    />
  );
};

export default SearchBar;
