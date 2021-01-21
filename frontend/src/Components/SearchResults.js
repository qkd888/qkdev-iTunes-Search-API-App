import React, { Component } from "react"; // This import statement allows access to the React library
import ResultsItem from "./ResultsItem"; // importing the ResultsItem component

export default class SearchResults extends Component {
  // Stateless component declaration
  render() {
    const { results, addToFavourites, clearResults } = this.props; // Destructuring props

    // If the results array has any items then
    // mapping through the array and returning
    // a ResultsItem component for each item.
    // The ResultsItem component takes in
    // item artistName, item trackName, item collectionName,
    // item artwork and the addFavourites function  as props

    if (results.length > 0) {
      return (
        <div className=" container resultsContainer">
          <h1 className=" heading mt-5 mb-5 ">Results</h1>
          {results.map((item, index) => {
            return (
              <div key={index}>
                <ResultsItem
                  artwork={item.artworkUrl100}
                  artistName={item.artistName}
                  trackName={item.trackName}
                  collectionName={item.collectionName}
                  addToFavourites={() => addToFavourites(item.trackId)}
                />
              </div>
            );
          })}
          {/*Clear results button which invokes the clearResults function when clicked */}
          <button className=" mt-5 mb-5 clearBtn" onClick={clearResults}>
            {" "}
            Clear Results <i className="fa fa-trash"></i>
          </button>{" "}
        </div>
      );
    } else {
      // Else return an H3 heading informing the user that there are no results
      return <h3 className="mt-5">No results</h3>;
    }
  }
}
