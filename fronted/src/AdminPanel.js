import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/users/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const currentUser = users.find((user) => user.id === userId);
    setEditedFields(currentUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editingUserId) {
        return editedFields;
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingUserId(null);
    setEditedFields({});
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedFields({});
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleDelete = (userId) => {
    // Send a delete request to your backend API
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the users state
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>
      <table className="admin-panel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editedFields.username || ""}
                    onChange={handleChange}
                    className="admin-panel-input"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    name="password"
                    value={editedFields.password || ""}
                    onChange={handleChange}
                    className="admin-panel-input"
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editedFields.role || ""}
                    onChange={handleChange}
                    className="admin-panel-input"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="admin-panel-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="admin-panel-button"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="admin-panel-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="admin-panel-button"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
