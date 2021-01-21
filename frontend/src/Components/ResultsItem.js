import React, { Component } from "react"; // This import statement allows access to the React library

export default class ResultsItem extends Component {
  // Stateless component declaration
  render() {
    const {
      addToFavourites,
      trackId,
      artwork,
      artistName,
      trackName,
      collectionName,
    } = this.props; // Destructuring props
    return (
      <div className=" shadow resultItem">
        {/*key set to the item id */}
        <div key={trackId}>
          {/*Item thumbnail */}
          <img src={artwork} width={100} height={100} alt="Thumbnail" />
          {/*Item artist name */}
          <p className="artistName">{artistName} </p>
          {/*Item track name */}
          <p className="trackName">{trackName} </p>
          {/*Item collection name */}
          <p className="collectionName">{collectionName} </p>
          {/*Add favourite item button which invokes the addFavourite function when clicked */}
          <button className="addFavourite" onClick={addToFavourites}>
            Add To Favourites
          </button>
        </div>
      </div>
    );
  }
}
