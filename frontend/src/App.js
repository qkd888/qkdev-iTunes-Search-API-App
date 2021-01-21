import React, { Component } from "react"; // This import statement allows access to the React library
import SearchInput from "./Components/SearchInput"; // Importing the SearchInput component from the components folder
import SearchResults from "./Components/SearchResults"; // Importing the SearchResults component from the components folder
import Favourites from "./Components/Favourites"; // Importing the Favourites component from the components folder
import "./App.css"; // Importing local css file

export default class App extends Component {
  // Stateful component declaration
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "", // initializing state for searchInput
      value: "all", // initializing state for value
      artistName: "", // initializing state for artistName
      trackName: "", // initializing state for trackName
      collectionName: "", // initializing state for collectionName
      artwork: "", // initializing state for artwork
      results: [], // initializing state for results
      favourites: [], // initializing state for favourites
      viewResults: false, // initializing state for viewResults
    };
  }

  // -------------------------- Change Handlers -------------------------- //

  // This function sets the state of searchInput
  // to what the user is entering on the search input field

  handleInputChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  // This function sets the state of value  to what the user
  // picked on the dropdown list for media types

  handleSelectChange = (event) => {
    this.setState({ value: event.target.value });
  };

  // -------------------------- Fetch request To external api -------------------------- //

  /* The search function makes a post request to the server.
  The body of the request contains what the user is searching 
  for - search query and the media type. The server then makes
  a GET request to the 3rd party api and sends back the data to the
  client as a response*/

  search = () => {
    const { value, searchInput } = this.state;
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchInput: searchInput,
        category: value,
      }),
    })
      .then((res) => res.json())
      .then((response) =>
        this.setState(
          { results: response.Data.results, viewResults: true },
          () => console.log(response.Data)
        )
      )
      .catch((error) => console.log("Error:", error));
  };
  // -------------------------- Adding an item to favourites -------------------------- //

  /* The addToFavourites function makes a post request to the server.
  When a user clicks on an item, that item's artistName, trackName, collectioName
  and artwork properties are set to the respective states. The set state method
  is asynchronous so it takes in a callback an argument. Here an anonymous function
  is invoked as a callback once the state has updated. The anonymous function
  then makes a post request to the server. The body of the request contains
  the information about the item thats being added to the favourites list,
  the server then adds the item to the list and returns an updated list as a response
  to the client */

  addToFavourites = (id) => {
    const { results } = this.state;
    var selectedItem = results.find((item) => item.trackId === id);
    console.log(selectedItem.artworkUrl100);

    this.setState(
      {
        artistName: selectedItem.artistName,
        trackName: selectedItem.trackName,
        collectionName: selectedItem.collectionName,
        artwork: selectedItem.artworkUrl100,
      },
      function () {
        const { artistName, trackName, collectionName, artwork } = this.state;
        fetch("/favourites/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artistName: artistName,
            trackName: trackName,
            collectionName: collectionName,
            artwork: artwork,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            this.setState({
              favourites: response.data,
            });
            alert(`server response: ${response.status}`);
          })
          .catch((error) => console.log("Error:", error));
      }
    );
  };
  // -------------------------- Removing an item from favourites -------------------------- //

  /*The deleteFavourite function deletes a specific item on the favourites list
  by making a Delete request to the server.The item id is parsed in the url
  so that the server knows which item to delete. The server then deletes the 
  specific item on the list then it sends back an updated favourites list as a 
  response to the client*/
  deleteFavourite = (id) => {
    fetch(`/favourites/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          favourites: response.data,
        });
        alert(`server response: ${response.status}`);
      })
      .catch((error) => console.log("Error:", error));
  };

  // ------------------------- Clearing the results ---------------------------- //

  /* The clearResults clears the results array */

  clearResults = () => {
    alert("Results Cleared");
    this.setState({
      results: [],
      viewResults: false,
    });
  };

  // ------------------------- Life cyle function ---------------------------- //

  /* The componentDidMount function makes a GET request to the server, and the server
  responds with a list of favourite items */

  componentDidMount() {
    fetch("/favourites")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message) {
            this.setState({
              message: result.message,
            });
          } else {
            this.setState({ favourites: result, viewFavourites: true }, () =>
              console.log("data fetched", result)
            );
          }
        },
        (error) => {
          console.log(error);
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    const { value, searchInput, results, favourites, viewResults } = this.state; // Destructuring state
    return (
      <div className="App">
        <div className="container shadow  pb-1 ">
          <h1 className=" mainHeading">
            {" "}
            Welcome to the Itunes Search Api App
          </h1>
          <h4>Search for your favourite content</h4>

          <i className="fa fa-music mr-2"></i>
          <i className="fa fa-podcast ml-1"></i>

          {/*SearchInput component */}
          <SearchInput
            value={value}
            searchInput={searchInput}
            handleInputChange={this.handleInputChange}
            handleSelectChange={this.handleSelectChange}
            search={this.search}
          />
        </div>

        {/*If the state of viewResults is true then the SearchResults component
         is returned, else an empty string is returned */}

        {viewResults ? (
          <SearchResults
            results={results}
            addToFavourites={this.addToFavourites}
            clearResults={this.clearResults}
          />
        ) : (
          ""
        )}
        {/*Favourites component */}
        <Favourites
          favourites={favourites}
          deleteFavourite={this.deleteFavourite}
        />
      </div>
    );
  }
}
