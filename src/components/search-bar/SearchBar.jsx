import React from "react";
import "./SearchBar.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
  return (
    <div className="search-bar">
      {/* <input
        type="text"
        placeholder="Search for events"
        className="search-bar__input"
      /> */}

      <Input
        type="text"
        name="search"
        placeholder="Search for events"
        className="search-bar__input"
      />
      <SearchOutlined className="search-bar__input-icon" />

      {/* <button className="search-bar__button">Search</button> */}
    </div>
  );
};

export default SearchBar;
