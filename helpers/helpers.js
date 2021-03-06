// Method to write to JSON

const fs = require("fs");

// Method to write out data to JSON file
writeData = (data, message, res) => {
  fs.writeFile("data/favourites.json", JSON.stringify(data), (err) => {
    res.status(201).json({
      status: `${message}`,
      data,
    });
  });
};

//  Parsed JSON files / Syncronous reading
let content = JSON.parse(fs.readFileSync("data/favourites.json"));

module.exports = {
  writeData,
  content,
};
