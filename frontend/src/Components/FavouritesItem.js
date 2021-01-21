import React, { Component } from "react"; // This import statement allows access to the React library

export default class FavouritesItem extends Component {
  // Stateless component declaration
  render() {
    const {
      deleteFavourite,
      id,
      artwork,
      artistName,
      trackName,
      collectionName,
    } = this.props; // Destructuring props
    return (
      <div>
        <div className=" shadow favouriteItem">
          {/*key set to the item id */}
          <div key={id}>
            {/*Item artist name */}
            <p className="artistName">{artistName} </p>
            {/*Item track name */}
            <p className="trackName">{trackName} </p>
            {/*Item collection name */}
            <p className="collectionName">{collectionName} </p>
            {/*Delete favourite item button which invokes the deleteFavourite function when clicked */}
            <button className="deleteFavourite " onClick={deleteFavourite}>
              Delete <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
