const db = require("../config/dbConfig");

// Controller for user login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database
    const [user] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if the password matches
    if (user[0].password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Return user role to the client
    res.json({ role: user[0].role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for user signup
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists in the database
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Insert new user into the database
    await db
      .promise()
      .query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
        username,
        password,
        "regular",
      ]);

    // Return success message
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
