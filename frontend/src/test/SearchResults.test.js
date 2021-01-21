import React from "react"; // This import statement allows access to the React library
import SearchResults from "../Components/SearchResults"; // importing the SearchResults component
import renderer from "react-test-renderer"; // importing the renderer  component from react-test-renderer

// Snapshot tests for the SearchResults component

// Testing if the SearchResults component renders properly if its passed an empty array
test("Renders correctly with empty array", () => {
  const tree = renderer.create(<SearchResults results={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Testing if the SearchResults component renders properly if its passed a populated array
test("Renders correctly with populuated array", () => {
  const results = [
    {
      trackId: 1,
      artistName: "j cole",
      trackName: "4 your eyes",
      collectionName: "4 your eyes only",
      artworkUrl100: "www.loremIp.com",
    },
  ];
  const tree = renderer.create(<SearchResults results={results} />).toJSON();
  expect(tree).toMatchSnapshot();
});
