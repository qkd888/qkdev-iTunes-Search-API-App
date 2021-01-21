import React from "react";
import { render } from "@testing-library/react"; // Importing the render component from react
import App from "../App"; // Importing the App component

// Unit test for the App component
test("Renders main heading", () => {
  const { getByText } = render(<App />);
  const mainHeading = getByText(/Welcome to the Itunes Search Api App/i);
  expect(mainHeading).toBeInTheDocument();
});
