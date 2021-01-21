const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const router = express.Router();

let { writeData, content } = require("../helpers/helpers");

//---------------------------- Get Favourites -----------------------------//

// This route makes a Get request to the itunes api with the search query that
// it retrieved from the body of the request object. It then sends the data
// it received back to the client as a response

router.post("/search", async (req, res) => {
    const searchInput = req.body.searchInput;
    const category = req.body.category;

    if (category === "all") {
        var url = `https://itunes.apple.com/search?term=${searchInput}`;
    } else {
        var url = `https://itunes.apple.com/search?term=${searchInput}&entity=${category}`;
    }

    const fetch_response = await fetch(url);
    const result = await fetch_response.json();
    res.json({ Data: result });
});

//------------------------ Get all favourite items -----------------------------//

// This route returns all the favourite items that the user added to the list
// back to the client as a response

router.get("/favourites", (req, res) => {
    content.length === 0
        ? res.json({ message: "No data available." })
        : res.send(content);
});

//--------------------- Post a favourite item -----------------------------//

// This route adds a new favourite item to the favourites list. It retrieves
// the information of the new  item in the body of the request object.
// It sends back an updated list of favourite items to the client as a response

router.post("/favourites/new", (req, res) => {
    if (content.length === 0) {
        var id = 1;
    } else {
        var id = content[content.length - 1].id + 1;
    }

    const new_post = Object.assign({ id }, req.body);

    content.push(new_post);

    writeData(
        content,
        `Item #${id} was successfully added to My favourites!`,
        res
    );
});

//--------------------- Delete a favourite item -----------------------------//

// This route deletes a specific item from the favourites list, it knows
// which item to delete because the id of the item thats about to be deleted
// is parsed in the url of the delete request. An updated favourites list'\
// is then sent back to the client as a response

router.delete("/favourites/:id", (req, res) => {
    const id = req.params.id;
    const Posts = content.filter((p) => p.id != id);
    const post = content.find((p) => p.id == id);

    post == undefined
        ? res.json({ message: `Item #${id} does not exist.` })
        : (content = Posts);

    writeData(
        content,
        `Item #${id} was succesfully deleted from my favourites`,
        res
    );
});

module.exports = router;
