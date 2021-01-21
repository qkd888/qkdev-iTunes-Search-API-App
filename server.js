const express = require("express");
const routes = require("./routes");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Middlewear
app.use(express.json());
app.use("/", routes);
app.use(bodyParser.json());
app.use(helmet());

// Error Handlers
app.use((err, req, res, next) => {
  console.warn(err.stack);
  res.status(500).send("Something broke!");
});

// Estabishing Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));

module.exports = app;
