import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams hook
import { BookContext } from "../context/BookContext";

const WriterFilterByRatio = () => {
  const { writers, selectedWriter, handleWriterSelect } =
    useContext(BookContext);
  const [searchParams, setSearchParams] = useSearchParams(); // Initialize useSearchParams

  const onWriterChange = (event) => {
    const value = event.target.value;
    const writerId = value === "all" ? null : Number(value);
    console.log("Selected Writer ID:", writerId); // Debugging line

    handleWriterSelect(writerId);

    // Update the search parameter without redirecting
    if (writerId === null) {
      searchParams.delete("writer"); // Remove the writer parameter if "All Writers" is selected
    } else {
      searchParams.set("writer", writerId); // Set the writer parameter with the selected writer's ID
    }
    setSearchParams(searchParams); // Apply the updated search parameters
  };

  return (
    <div>
      <h3>Filter by Writer</h3>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px" }}>
          <input
            type="radio"
            value="all"
            checked={selectedWriter === null}
            onChange={onWriterChange}
          />
          {" All Writers"}
        </label>
        {writers.map((writer) => (
          <label key={writer.id} style={{ marginBottom: "8px" }}>
            <input
              type="radio"
              value={writer.id}
              checked={selectedWriter === writer.id}
              onChange={onWriterChange}
            />
            {` ${writer.name}`}
          </label>
        ))}
      </form>
    </div>
  );
};

export default WriterFilterByRatio;
