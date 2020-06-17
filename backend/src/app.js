const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");

app = express();

app.use(cors());
app.use(express.json());
// Serving static assets
app.use("/uploads", express.static(path.resolve(__dirname, "..", "assets")));
app.use(routes);

module.exports = app;
