const db = require("../config/dbConfig");

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM users"); // Extract rows from the query result
    res.json(rows); // Send only the rows to the client
    console.log(rows); // Optional: Log the rows for debugging
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
};

// Controller for deleting a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id; // Extract user ID from request parameters
  console.log(userId);
  try {
    // Execute delete query to remove the user from the database
    await db.promise().query("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
