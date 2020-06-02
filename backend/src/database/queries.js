const pool = require("./db");

const getUsers = async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    response.json(allUsers.rows);
  } catch (error) {
    response.status(500).send();
  }
};

const getUserById = async (request, response) => {
  const id = request.params.id;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (!user.rowCount) {
      return response.status(404).send();
    }
    response.json(user.rows[0]);
  } catch (error) {
    response.status(500).send();
  }
};

const createUser = async (request, response) => {
  const {
    first_name,
    second_name,
    email,
    phone,
    address,
    password,
  } = request.body;

  // TODO: generate the jwt with the password!

  try {
    await pool.query(
      "INSERT INTO users (first_name, second_name, email, phone, address, password) VALUES ($1, $2, $3, $4, $5, $6)",
      [first_name, second_name, email, phone, address, password]
    );
    response.status(201).send({ first_name, email, address, password });
  } catch (error) {
    response.status(401).send(error);
  }
};

const updateUser = async (request, response) => {
  const updates = Object.keys(request.body);
  const values = Object.values(request.body);
  const allowedUpdates = [
    "first_name",
    "last_name",
    "email",
    "password",
    "address",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return response.status(400).send({ error: "Invalid updates!" });
  }

  const id = request.params.id;
  const user = request.body;

  // query construction
  const query = ["UPDATE users SET"];
  const setQuery = [];
  const offset = 1;
  updates.forEach((key, i) => {
    setQuery.push(key + " = ($" + (i + offset) + ")");
  });
  query.push(setQuery.join(", "));
  query.push("WHERE user_id = '" + id + "'");

  try {
    await pool.query(query.join(" "), values);
    response.send(user);
  } catch (error) {
    console.error(error.message);
    response.status(400).send();
  }
};

const deleteUser = async (request, response) => {
  const id = request.params.id;

  try {
    const result = await pool.query("DELETE FROM users WHERE user_id = $1", [
      id,
    ]);
    if (result.rowCount == 1) {
      response.send("User was deleted");
    }
    response.send("User not found");
  } catch (error) {
    console.log(error.message);
  }
};

const getCompanies = async (request, response) => {
  try {
    const allCompanies = await pool.query("SELECT * FROM companies");
    response.json(allCompanies.rows);
  } catch (error) {
    response.status(500).send();
  }
};

const getCompanyById = async (request, response) => {
  const id = request.params.id;
  try {
    const company = await pool.query(
      "SELECT * FROM companies WHERE company_id = $1",
      [id]
    );
    if (!company.rowCount) {
      return response.status(404).send();
    }
    response.json(company.rows[0]);
  } catch (error) {
    response.status(500).send();
  }
};

const createCompany = async (request, response) => {
  const { name, email, phone, address } = request.body;

  // TODO: generate the jwt with the password!

  try {
    await pool.query(
      "INSERT INTO companies (name, email, phone, address) VALUES ($1, $2, $3, $4)",
      [name, email, phone, address]
    );
    response.status(201).send({ name, email, phone, address });
  } catch (error) {
    response.status(401).send(error);
  }
};

const updateCompany = async (request, response) => {
  const updates = Object.keys(request.body);
  const values = Object.values(request.body);
  const allowedUpdates = ["name", "email", "phone", "address"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return response.status(400).send({ error: "Invalid updates!" });
  }

  const id = request.params.id;
  const company = request.body;

  // query construction
  const query = ["UPDATE companies SET"];
  const setQuery = [];
  const offset = 1;
  updates.forEach((key, i) => {
    setQuery.push(key + " = ($" + (i + offset) + ")");
  });
  query.push(setQuery.join(", "));
  query.push("WHERE company_id = '" + id + "'");

  try {
    await pool.query(query.join(" "), values);
    response.send(company);
  } catch (error) {
    console.error(error.message);
    response.status(400).send();
  }
};

const deleteCompany = async (request, response) => {
  const id = request.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM companies WHERE company_id = $1",
      [id]
    );
    if (result.rowCount == 1) {
      response.send("Company was deleted");
    }
    response.send("Company not found");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
