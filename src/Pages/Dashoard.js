import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;

    const AddUser = () => navigate("/register");
    const LoginUser = () => navigate("/");



    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.user.id);
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/api/auth/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            setUsers(data);

        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`${baseURL}/api/auth/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("User deleted successfully!");
                fetchUsers(); // refresh table
            } else {
                alert(data.message || "Error deleting user");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h1 style={styles.heading}>User Dashboard</h1>
                <p style={styles.subHeading}>Logged-in User ID: <b>{userId}</b></p>

                <div style={styles.actionButtons}>
                    <button style={styles.primaryBtn} onClick={AddUser}>➕ Add User</button>
                    <button style={styles.secondaryBtn} onClick={LoginUser}>🔐 Logout</button>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <h2 style={styles.tableTitle}>All Registered Users</h2>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Plain Password</th>
                            <th style={styles.th}>Hashed Password</th>
                            <th style={styles.th}>Created At</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} style={styles.tr}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>{user.plainPassword || "N/A"}</td>
                                <td style={{ ...styles.td, maxWidth: "250px", wordWrap: "break-word" }}>
                                    {user.password}
                                </td>
                                <td style={styles.td}>{new Date(user.createdAt).toLocaleString()}</td>
                                <td style={styles.td}>
                                    <button style={styles.editBtn} onClick={() => handleEdit(user._id)}>
                                        ✏️ Edit
                                    </button>
                                    <button style={styles.deleteBtn} onClick={() => handleDelete(user._id)}>
                                        🗑️ Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        padding: "50px",
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        marginBottom: "40px",
        textAlign: "center",
    },
    heading: {
        fontSize: "36px",
        fontWeight: "700",
        marginBottom: "5px",
        color: "#222",
    },
    subHeading: {
        fontSize: "18px",
        color: "#555",
        marginBottom: "20px",
    },
    actionButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "10px",
    },
    primaryBtn: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        transition: "0.2s",
    },
    secondaryBtn: {
        padding: "10px 20px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        transition: "0.2s",
    },
    deleteBtn: {
        padding: "6px 12px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        marginLeft: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        transition: "0.2s",
    },
    tableContainer: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "1100px",
        margin: "auto",
    },
    tableTitle: {
        fontSize: "24px",
        marginBottom: "20px",
        textAlign: "left",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        padding: "12px",
        backgroundColor: "#eef2f7",
        borderBottom: "2px solid #d6d6d6",
        fontWeight: "bold",
        textAlign: "left",
        color: "#333",
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #ddd",
        color: "#444",
    },
    tr: {
        backgroundColor: "#fff",
        transition: "0.2s",
    },
    editBtn: {
        padding: "6px 12px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    },
};

export default Dashboard;
