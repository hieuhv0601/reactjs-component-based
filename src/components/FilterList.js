// components/FilterList.js
import React from "react"; // Import React
import { ListGroup } from "react-bootstrap"; // Import Bootstrap ListGroup for styled list
import { Link } from "react-router-dom"; // Import Link for client-side navigation

// FilterList component takes three props:
// - items: an array of items to display in the list
// - path: the base URL path for the links
// - labelKey: the key for the label displayed for each item (default is "name")
const FilterList = ({ items, path, labelKey = "name" }) => (
  <ListGroup variant="flush">
    {" "}
    {/* Use Bootstrap's flush style for the ListGroup */}
    {items.map((item) => (
      <ListGroup.Item key={item.id}>
        {" "}
        {/* Each item is a ListGroup.Item */}
        <Link to={`${path}=${item.id}`}>{item[labelKey]}</Link>{" "}
        {/* Link to filter path with item ID */}
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default FilterList;
