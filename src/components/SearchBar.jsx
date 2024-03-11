import React from "react";

const SearchBar = ({ search, setSearch, handleSubmit, dark }) => {
  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Enter a city name"
        name="city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`inputdata ${dark && "inputdata-dark"}`}
      />
    </form>
  );
};

export default SearchBar;
