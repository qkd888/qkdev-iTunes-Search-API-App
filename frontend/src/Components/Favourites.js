import React, { Component } from "react"; // This import statement allows access to the React library
import FavouritesItem from "./FavouritesItem"; // importing the FavouritesItem component

export default class Favourites extends Component {
  // Stateless component declaration
  render() {
    const { favourites, deleteFavourite } = this.props; // Destructuring props
    if (favourites.length > 0) {
      return (
        // If the Favourites array has any items then
        // mapping through the array and returning
        // a FavouriteItem component for each item.
        // The FavouriteItem component takes in
        // item artistName, item trackName, item collectionName,
        // item artwork and the deleteFavourite function  as props

        <div className=" container favouritesContainer ">
          <h1 className=" heading mt-5 mb-5">My Favourites</h1>
          {favourites.map((item, index) => {
            return (
              <div key={index}>
                <FavouritesItem
                  artistName={item.artistName}
                  trackName={item.trackName}
                  collectionName={item.collectionName}
                  artwork={item.artworkUrl100}
                  deleteFavourite={() => deleteFavourite(item.id)}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      // Else return an empty string
      return "";
    }
  }
}
