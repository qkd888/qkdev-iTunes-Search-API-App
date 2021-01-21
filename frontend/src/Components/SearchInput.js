import React, { Component } from "react"; // This import statement allows access to the React library

export default class SearchInput extends Component {
  // Stateless component declaration
  render() {
    const {
      search,
      value,
      searchInput,
      handleSelectChange,
      handleInputChange,
    } = this.props; // Destructuring props
    return (
      <div className="searchInput">
        <div className="inputContainer">
          {/*Input search field */}
          <input
            type="text"
            placeholder="Search eg: Kaytranada"
            value={searchInput}
            onChange={handleInputChange}
            className="input "
          />
        </div>
        <div className="selectContainer">
          {/*Dropdown list for media type */}
          <select
            value={value}
            onChange={handleSelectChange}
            className="select "
          >
            <option className="option" value="all">
              All
            </option>
            <option value="software">Software</option>
            <option value="tvSeason">TvShow</option>
            <option value="shortFilm">ShortFilm</option>
            <option value="audiobook">AudioBook</option>
            <option value="musicVideo">MusicVideo</option>
            <option value="musicTrack">Music</option>
            <option value="podcast">Podcast</option>
            <option value="movie">Movie</option>
            <option value="ebook">Ebook</option>
          </select>
        </div>
        {/*Search button which invokes the search function when clicked */}
        <button className="searchBtn" onClick={search}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}
