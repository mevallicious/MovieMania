import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies, actors, or shows..."
        value={query}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
};

export default SearchBar;