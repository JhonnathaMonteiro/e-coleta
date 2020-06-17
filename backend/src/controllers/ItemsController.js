const pool = require("../database/db");

class ItemsController {
  getItems = async (request, response) => {
    try {
      const allItems = await pool.query("SELECT * FROM items");
      const serializedItems = allItems.rows.map((item) => {
        return {
          name: item.title,
          imageUrl: `http://localhost:3000/uploads/${item.image}`,
        };
      });
      response.json(serializedItems);
    } catch (error) {
      response.status(500).send();
    }
  };

  getItemById = async (request, response) => {
    const id = request.params.id;
    try {
      const item = await pool.query("SELECT * FROM items WHERE item_id = $1", [
        id,
      ]);
      if (!item.rowCount) {
        return response.status(404).send();
      }
      response.json(item.rows[0]);
    } catch (error) {
      response.status(500).send();
    }
  };

  createItem = async (request, response) => {
    const { image, title } = request.body;

    try {
      await pool.query("INSERT INTO items (image, title) VALUES ($1, $2)", [
        image,
        title,
      ]);
      response.status(201).send({ image, title });
    } catch (error) {
      response.status(401).send(error);
    }
  };

  updateItem = async (request, response) => {
    const updates = Object.keys(request.body);
    const values = Object.values(request.body);
    const allowedUpdates = ["image", "title"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return response.status(400).send({ error: "Invalid updates!" });
    }

    const id = request.params.id;
    const item = request.body;

    // query construction
    const query = ["UPDATE items SET"];
    const setQuery = [];
    const offset = 1;
    updates.forEach((key, i) => {
      setQuery.push(key + " = ($" + (i + offset) + ")");
    });
    query.push(setQuery.join(", "));
    query.push("WHERE item_id = " + id);

    try {
      await pool.query(query.join(" "), values);
      response.send(item);
    } catch (error) {
      console.error(error.message);
      response.status(400).send();
    }
  };

  deleteItem = async (request, response) => {
    const id = request.params.id;

    try {
      const result = await pool.query("DELETE FROM items WHERE item_id = $1", [
        id,
      ]);
      if (result.rowCount == 1) {
        response.send("Item was deleted");
      }
      response.send("Item not found");
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = ItemsController;
