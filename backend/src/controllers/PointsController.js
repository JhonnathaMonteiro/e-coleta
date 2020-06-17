const pool = require("../database/db");

class PointsController {
  getPoints = async (request, response) => {
    try {
      const allPoints = await pool.query("SELECT * FROM points");
      response.json(allPoints.rows);
    } catch (error) {
      response.status(500).send();
    }
  };

  getPointById = async (request, response) => {
    const id = request.params.id;
    try {
      const point = await pool.query(
        "SELECT * FROM points WHERE point_id = $1",
        [id]
      );
      if (!point.rowCount) {
        return response.status(404).send();
      }
      response.json(point.rows[0]);
    } catch (error) {
      response.status(500).send();
    }
  };

  createPoint = async (request, response) => {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    // TODO: generate the jwt with the password!
    console.log(name);

    try {
      const result = await pool.query(
        `
        INSERT INTO points (name, email, whatsapp, latitude, longitude, city, uf) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING point_id
        `,
        [name, email, whatsapp, latitude, longitude, city, uf]
      );

      const point_id = result.rows[0].point_id;
      const valueQuery = [];
      items.forEach((item_id) => {
        valueQuery.push(`(${point_id}, ${item_id})`);
      });

      await pool.query(`
        INSERT INTO points_items (point_id, item_id)
          VALUES ${valueQuery.join(", ")}
      `);

      response
        .status(201)
        .send({ name, email, whatsapp, latitude, longitude, city, uf });
    } catch (error) {
      response.status(401).send(error);
    }
  };

  updatePoint = async (request, response) => {
    const updates = Object.keys(request.body);
    const values = Object.values(request.body);
    const allowedUpdates = [
      "name",
      "email",
      "whatsapp",
      "latitude",
      "longitude",
      "city",
      "uf",
    ];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return response.status(400).send({ error: "Invalid updates!" });
    }

    const id = request.params.id;

    // query construction
    const query = ["UPDATE points SET"];
    const setQuery = [];
    const offset = 1;
    updates.forEach((key, i) => {
      setQuery.push(key + " = ($" + (i + offset) + ")");
    });
    query.push(setQuery.join(", "));
    query.push("WHERE point_id = " + id);

    try {
      const point = await pool.query(
        "UPDATE points SET ($1) WHERE point_id = ($2)",
        [values, id]
      );
      response.send(point);
    } catch (error) {
      console.error(error.message);
      response.status(400).send();
    }
  };

  deletePoint = async (request, response) => {
    const id = request.params.id;

    try {
      const result = await pool.query(
        "DELETE FROM points WHERE point_id = $1",
        [id]
      );
      if (result.rowCount == 1) {
        response.send("Point was deleted");
      }
      response.send("Point not found");
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = PointsController;
