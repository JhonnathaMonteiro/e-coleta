const express = require("express");

const PointsController = require("./controllers/PointsController");
const ItemsController = require("./controllers/ItemsController");

const points = new PointsController();
const item = new ItemsController();

const routes = express.Router();

// Points routes
routes.get("/points", points.getPoints);
routes.get("/points/:id", points.getPointById);
routes.post("/points", points.createPoint);
routes.patch("/points/:id", points.updatePoint);
routes.delete("/points/:id", points.deletePoint);

// Items routes
routes.get("/items", item.getItems);
routes.get("/items/:id", item.getItemById);
routes.post("/items", item.createItem);
routes.patch("/items/:id", item.updateItem);
routes.delete("/items/:id", item.deleteItem);

module.exports = routes;
