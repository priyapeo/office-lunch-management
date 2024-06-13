require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const signup = async (request, response) => {
  const { username, email, role } = request.body;

  if (!username || !email || !role) {
    return response
      .status(400)
      .json({ message: "username, email, role required" });
  }

  try {
    const query = `INSERT INTO users (username, email, role, created_at)
  VALUES ($1, $2, $3, NOW()) RETURNING *;`;

    const values = [username, email, role];

    const result = await pool.query(query, values);

    response.json({
      message: "Signup Successfull",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    response.status(500).send("Server error");
  }
};

const login = async (request, response) => {
  const { username, email } = request.body;

  if (!username || !email) {
    return response.status(400).json({ message: "username, email required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = $1 AND email = $2";
    const values = [username, email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    response.json({
      message: "Login successful",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server error" });
  }
};

const addMenu = async (request, response) => {
  const { name, description, image_url, created_at } = request.body;

  if (!name || !description || !image_url || !created_at) {
    return response.status(400).json({
      message: "name, description, image_url and created_at required",
    });
  }

  try {
    const query =
      "INSERT INTO menus (name, description, image_url, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [name, description, image_url, created_at];
    const result = await pool.query(query, values);

    response.json({
      message: "Menu created successfully",
      menu: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server error" });
  }
};

const getOrders = async (request, response) => {
  try {
    const query = `
    SELECT
      orders.id AS order_id,
      orders.created_at AS order_created_at,
      users.id AS user_id,
      users.username AS user_name,
      users.email AS user_email,
      menus.id AS menu_id,
      menus.name AS menu_name,
      menus.description AS menu_description,
      menus.image_url AS menu_image_url
    FROM
      orders
    JOIN
      users ON orders.user_id = users.id
    JOIN
      menus ON orders.menu_id = menus.id`;

    const result = await pool.query(query);

    const formattedResult = result.rows.map((row) => ({
      id: row.order_id,
      created_at: row.order_created_at,
      user: {
        id: row.user_id,
        username: row.user_name,
        email: row.user_email,
      },
      menu: {
        id: row.menu_id,
        name: row.menu_name,
        description: row.menu_description,
        image_url: row.menu_image_url,
      },
    }));

    response.json({
      orders: formattedResult,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  signup,
  login,
  addMenu,
  getOrders,
};
