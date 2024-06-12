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

module.exports = {
  signup,
  login,
};
