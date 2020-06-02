const express = require("express");

const db = require("./database/queries");

const routes = express.Router();

// Users routes
routes.get("/users", db.getUsers);
routes.get("/users/:id", db.getUserById);
routes.post("/users", db.createUser);
routes.patch("/users/:id", db.updateUser);
routes.delete("/users/:id", db.deleteUser);

// Companies routes
routes.get("/companies", db.getCompanies);
routes.get("/companies/:id", db.getCompanyById);
routes.post("/companies", db.createCompany);
routes.patch("/companies/:id", db.updateCompany);
routes.delete("/companies/:id", db.deleteCompany);

module.exports = routes;
